import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {createClient} from '@supabase/supabase-js';
import {getSupabaseEnv} from '../../config/supabase-env';
import {AdminAuthService} from '../../auth/admin-auth.service';

@Component({
  selector: 'app-trainer-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Trainer Dashboard</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Profile Editor -->
        <div class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">My Public Profile</h2>
          
          <div *ngIf="loading" class="text-gray-500">Loading profile...</div>
          
          <form *ngIf="!loading" (ngSubmit)="updateProfile()" #form="ngForm">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea 
                [(ngModel)]="profile.bio" 
                name="bio" 
                rows="4" 
                class="w-full p-2 border rounded"
                placeholder="Tell clients about yourself..."
              ></textarea>
            </div>

            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Specialties (comma separated)</label>
              <input 
                type="text" 
                [ngModel]="specialtiesString" 
                (ngModelChange)="updateSpecialties($event)"
                name="specialties" 
                class="w-full p-2 border rounded"
                placeholder="e.g. Yoga, HIIT, Strength"
              >
            </div>

            <div class="mb-4">
               <label class="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
               <input 
                type="text" 
                [(ngModel)]="profile.avatar_url" 
                name="avatar_url" 
                class="w-full p-2 border rounded"
                placeholder="https://..."
              >
            </div>

            <div *ngIf="message" [class]="'p-3 rounded mb-4 ' + (messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700')">
              {{ message }}
            </div>

            <button 
              type="submit" 
              [disabled]="saving"
              class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : 'Update Profile' }}
            </button>
          </form>
        </div>

        <!-- My Schedule / Classes (Placeholder) -->
        <div class="bg-white p-6 rounded shadow">
          <h2 class="text-xl font-semibold mb-4">My Schedule</h2>
          <div class="bg-gray-50 p-4 rounded text-center text-gray-500">
            <p>No classes scheduled for today.</p>
            <button class="mt-4 text-blue-600 hover:underline">View Full Schedule</button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TrainerPanelComponent implements OnInit {
  private supabase = createClient(getSupabaseEnv().url, getSupabaseEnv().anonKey);
  private auth = inject(AdminAuthService);

  profile: any = {};
  specialtiesString = '';
  loading = true;
  saving = false;
  message = '';
  messageType = 'success';

  async ngOnInit() {
    await this.loadProfile();
  }

  async loadProfile() {
    this.loading = true;
    const {data: {user}} = await this.supabase.auth.getUser();
    if (!user) return;

    const {data, error} = await this.supabase
      .from('profiles')
      .select('bio, specialties, avatar_url')
      .eq('id', user.id)
      .single();

    if (data) {
      this.profile = data;
      this.specialtiesString = (data.specialties || []).join(', ');
    }
    this.loading = false;
  }

  updateSpecialties(value: string) {
    this.specialtiesString = value;
    this.profile.specialties = value.split(',').map(s => s.trim()).filter(s => s);
  }

  async updateProfile() {
    this.saving = true;
    this.message = '';
    
    const {data: {user}} = await this.supabase.auth.getUser();
    if (!user) return;

    const {error} = await this.supabase
      .from('profiles')
      .update({
        bio: this.profile.bio,
        specialties: this.profile.specialties,
        avatar_url: this.profile.avatar_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id);

    if (error) {
      this.message = 'Failed to update profile';
      this.messageType = 'error';
    } else {
      this.message = 'Profile updated successfully';
      this.messageType = 'success';
    }
    this.saving = false;
  }
}
