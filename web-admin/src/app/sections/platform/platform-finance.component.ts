import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';

@Component({
  selector: 'app-platform-finance',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section>
      <h2>Platform Finance</h2>
      <p>Revenue overview and payment collection settings.</p>

      <div class="grid">
        <div class="card">
           <h3>Total Revenue</h3>
           <p class="big-number">$12,500</p>
           <p class="subtitle">This Month</p>
        </div>
        <div class="card">
           <h3>Active Subscriptions</h3>
           <p class="big-number">8</p>
           <p class="subtitle">Paying Tenants</p>
        </div>
        <div class="card">
           <h3>Pending Invoices</h3>
           <p class="big-number">$1,200</p>
           <p class="subtitle">Overdue</p>
        </div>
      </div>

      <div class="payment-section">
        <h3>Payment Gateways</h3>
        <p>Configure how tenants pay for the platform subscription.</p>
        
        <div class="payment-methods">
            <div class="method-card">
                <div class="method-header">
                    <h4>Bank Alfalah (Alfa)</h4>
                    <span class="chip-active">Connected</span>
                </div>
                <p>Accept credit cards and direct debits via Alfa Payment Gateway.</p>
                <button class="btn-secondary">Configure</button>
            </div>
            
            <div class="method-card">
                <div class="method-header">
                    <h4>Bank Transfer</h4>
                    <span class="chip-active">Enabled</span>
                </div>
                <p>Manual bank transfer instructions for tenants.</p>
                <button class="btn-secondary">Edit Instructions</button>
            </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    section { padding: 1rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .card { padding: 1.5rem; border: 1px solid #e5e7eb; border-radius: 8px; background: white; box-shadow: 0 1px 2px rgba(0,0,0,0.05); text-align: center; }
    .big-number { font-size: 2.5rem; font-weight: 700; color: #111827; margin: 0.5rem 0; }
    .subtitle { color: #6b7280; font-size: 0.875rem; }
    
    .payment-section { margin-top: 2rem; }
    .payment-methods { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1rem; }
    .method-card { border: 1px solid #e5e7eb; padding: 1.5rem; border-radius: 8px; background: white; }
    .method-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .method-header h4 { margin: 0; font-size: 1.125rem; }
    
    .chip-active { background: #dcfce7; color: #166534; padding: 0.25rem 0.5rem; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; }
    
    .btn-secondary { margin-top: 1rem; background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer; }
    .btn-secondary:hover { background: #e5e7eb; }
  `]
})
export class PlatformFinanceComponent {}
