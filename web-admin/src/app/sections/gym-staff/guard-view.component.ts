import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-guard-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 text-center">
      <h1 class="text-3xl font-bold mb-6">Guard Terminal</h1>
      
      <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div class="mb-8">
          <div class="w-32 h-32 bg-gray-200 rounded-lg mx-auto flex items-center justify-center mb-4">
            <span class="text-4xl">📷</span>
          </div>
          <p class="text-gray-500">Camera preview would appear here on mobile.</p>
        </div>

        <button class="w-full bg-blue-600 text-white text-xl py-4 rounded-lg shadow hover:bg-blue-700 transition mb-4">
          Scan Member QR
        </button>

        <div class="border-t pt-4 mt-4">
          <h3 class="text-lg font-semibold mb-2">Manual Entry</h3>
          <input type="text" placeholder="Enter Member ID" class="w-full p-3 border rounded mb-2">
          <button class="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900">Check Status</button>
        </div>
      </div>
    </div>
  `
})
export class GuardViewComponent {}
