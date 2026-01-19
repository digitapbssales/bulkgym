import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GymService} from '../../services/gym.service';
import {AdminAuthService} from '../../auth/admin-auth.service';

@Component({
  selector: 'app-gym-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="users">
      <h2>User Management</h2>
      <p>Manage your staff and members here.</p>
      
      <div class="user-list">
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Full Name</th>
                    <th>Created At</th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let user of users()">
                    <td>{{ user.email }}</td>
                    <td>{{ user.role }}</td>
                    <td>{{ user.full_name || '-' }}</td>
                    <td>{{ user.created_at | date }}</td>
                </tr>
            </tbody>
        </table>
        
        <p *ngIf="users().length === 0">No users found.</p>
      </div>
    </div>
  `,
  styles: [`
    .users { padding: 1rem; }
    table { width: 100%; border-collapse: collapse; margin-top: 1rem; }
    th, td { text-align: left; padding: 0.75rem; border-bottom: 1px solid var(--border-color); color: var(--text-main); }
    th { color: var(--text-muted); font-weight: 500; font-size: 0.875rem; }
  `]
})
export class GymUsersComponent implements OnInit {
    private gymService = inject(GymService);
    private authService = inject(AdminAuthService);
    
    users = signal<any[]>([]);
    
    async ngOnInit() {
        const tenantId = this.authService.getTenantId();
        if (tenantId) {
            try {
                const users = await this.gymService.getGymUsers(tenantId);
                this.users.set(users);
            } catch (err) {
                console.error('Failed to load users', err);
            }
        }
    }
}
