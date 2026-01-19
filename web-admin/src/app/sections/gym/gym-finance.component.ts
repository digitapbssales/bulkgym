import {Component, inject, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms';
import {PaymentService} from '../../services/payment.service';
import {AdminAuthService} from '../../auth/admin-auth.service';
import {PaymentConfig} from '../../models/payment-config.model';

@Component({
  selector: 'app-gym-finance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="finance">
      <h2>Finance & Payments</h2>
      <p>Configure your payment gateways.</p>

      <div class="gateways-grid">
        <div *ngFor="let gateway of gateways" class="gateway-card">
          <div class="card-header">
            <h3>{{ gatewayNames[gateway] }}</h3>
            <label class="switch">
              <input 
                type="checkbox" 
                [checked]="isGatewayActive(gateway)" 
                [disabled]="isReadOnly"
                (change)="toggleGateway(gateway, $event)"
              >
              <span class="slider round" [class.cursor-not-allowed]="isReadOnly"></span>
            </label>
          </div>
          
          <div class="card-body" *ngIf="isGatewayActive(gateway)">
            <form [formGroup]="getForm(gateway)" (ngSubmit)="saveConfig(gateway)">
              <!-- Dynamic fields based on gateway type -->
              <ng-container [ngSwitch]="gateway">
                <ng-container *ngSwitchCase="'stripe'">
                  <div class="field">
                    <label>Publishable Key</label>
                    <input formControlName="publishableKey" type="text">
                  </div>
                  <div class="field">
                    <label>Secret Key</label>
                    <input formControlName="secretKey" type="password">
                  </div>
                </ng-container>

                <ng-container *ngSwitchCase="'easypaisa'">
                  <div class="field">
                    <label>Store ID</label>
                    <input formControlName="storeId" type="text">
                  </div>
                   <div class="field">
                    <label>Hash Key</label>
                    <input formControlName="hashKey" type="password">
                  </div>
                </ng-container>

                <ng-container *ngSwitchCase="'jazzcash'">
                  <div class="field">
                    <label>Merchant ID</label>
                    <input formControlName="merchantId" type="text">
                  </div>
                   <div class="field">
                    <label>Password</label>
                    <input formControlName="password" type="password">
                  </div>
                   <div class="field">
                    <label>Integrity Salt</label>
                    <input formControlName="integritySalt" type="password">
                  </div>
                </ng-container>

                <ng-container *ngSwitchCase="'bank_transfer'">
                   <div class="field">
                    <label>Bank Name</label>
                    <input formControlName="bankName" type="text">
                  </div>
                  <div class="field">
                    <label>Account Title</label>
                    <input formControlName="accountTitle" type="text">
                  </div>
                  <div class="field">
                    <label>IBAN / Account Number</label>
                    <input formControlName="accountNumber" type="text">
                  </div>
                </ng-container>
              </ng-container>

              <button *ngIf="!isReadOnly" type="submit" [disabled]="loading()">Save {{ gatewayNames[gateway] }}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .finance { padding: 1rem; }
    .gateways-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; margin-top: 1.5rem; }
    .gateway-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 0.75rem; padding: 1.5rem; }
    .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
    .card-header h3 { margin: 0; font-size: 1.1rem; }
    .field { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
    .field label { font-size: 0.875rem; color: var(--text-muted); }
    input { padding: 0.5rem; border-radius: 0.375rem; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-main); }
    button { background: var(--primary); color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.375rem; cursor: pointer; }
    button:disabled { opacity: 0.5; }
    
    /* Toggle Switch */
    .switch { position: relative; display: inline-block; width: 40px; height: 24px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 34px; }
    .slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 4px; bottom: 4px; background-color: white; transition: .4s; border-radius: 50%; }
    input:checked + .slider { background-color: var(--primary); }
    input:checked + .slider:before { transform: translateX(16px); }
  `]
})
export class GymFinanceComponent implements OnInit {
  private paymentService = inject(PaymentService);
  private authService = inject(AdminAuthService);
  private fb = inject(FormBuilder);

  gateways: PaymentConfig['gateway_type'][] = ['stripe', 'easypaisa', 'jazzcash', 'bank_transfer'];
  gatewayNames = {
    stripe: 'Stripe',
    easypaisa: 'Easypaisa',
    jazzcash: 'JazzCash',
    bank_transfer: 'Bank Transfer'
  };

  forms: {[key: string]: FormGroup} = {};
  configs: PaymentConfig[] = [];
  loading = signal(false);
  tenantId: string | null = null;
  isReadOnly = false;

  ngOnInit() {
    this.tenantId = this.authService.getTenantId();
    this.isReadOnly = this.authService.getUserRole() === 'accounts';

    if (this.tenantId) {
      this.loadConfigs();
    }
    
    // Initialize forms
    this.gateways.forEach(gw => {
      this.forms[gw] = this.fb.group({});
      this.setupFormControls(gw);
      
      if (this.isReadOnly) {
        this.forms[gw].disable();
      }
    });
  }

  setupFormControls(gateway: string) {
    const group = this.forms[gateway];
    if (gateway === 'stripe') {
      group.addControl('publishableKey', this.fb.control('', Validators.required));
      group.addControl('secretKey', this.fb.control('', Validators.required));
    } else if (gateway === 'easypaisa') {
      group.addControl('storeId', this.fb.control('', Validators.required));
      group.addControl('hashKey', this.fb.control('', Validators.required));
    } else if (gateway === 'jazzcash') {
      group.addControl('merchantId', this.fb.control('', Validators.required));
      group.addControl('password', this.fb.control('', Validators.required));
      group.addControl('integritySalt', this.fb.control('', Validators.required));
    } else if (gateway === 'bank_transfer') {
      group.addControl('bankName', this.fb.control('', Validators.required));
      group.addControl('accountTitle', this.fb.control('', Validators.required));
      group.addControl('accountNumber', this.fb.control('', Validators.required));
    }
  }

  async loadConfigs() {
    this.loading.set(true);
    try {
      this.configs = await this.paymentService.getPaymentConfigs(this.tenantId!);
      this.configs.forEach(config => {
        if (this.forms[config.gateway_type]) {
           this.forms[config.gateway_type].patchValue(config.config);
        }
      });
    } catch (error) {
      console.error('Error loading payment configs', error);
    } finally {
      this.loading.set(false);
    }
  }

  isGatewayActive(gateway: PaymentConfig['gateway_type']): boolean {
    const config = this.configs.find(c => c.gateway_type === gateway);
    return config?.is_active || false;
  }

  getForm(gateway: string): FormGroup {
    return this.forms[gateway];
  }

  async toggleGateway(gateway: PaymentConfig['gateway_type'], event: any) {
    if (!this.tenantId) return;
    const isActive = event.target.checked;
    
    // Find existing or create new
    let config = this.configs.find(c => c.gateway_type === gateway);
    if (!config) {
        config = {
            tenant_id: this.tenantId,
            gateway_type: gateway,
            is_active: isActive,
            config: {}
        };
        this.configs.push(config);
    } else {
        config.is_active = isActive;
    }

    try {
        await this.paymentService.upsertPaymentConfig(config);
    } catch (error) {
        console.error('Error updating status', error);
        // Revert checkbox if failed? For now just log
    }
  }

  async saveConfig(gateway: PaymentConfig['gateway_type']) {
    if (!this.tenantId) return;
    if (this.forms[gateway].invalid) return;

    this.loading.set(true);
    const formValue = this.forms[gateway].value;

    let config = this.configs.find(c => c.gateway_type === gateway);
    if (!config) {
        config = {
            tenant_id: this.tenantId,
            gateway_type: gateway,
            is_active: true, // If they are saving config, assume they want it active? Or keep as is.
            config: formValue
        };
        this.configs.push(config);
    } else {
        config.config = formValue;
    }

    try {
        await this.paymentService.upsertPaymentConfig(config);
        alert('Configuration saved successfully');
    } catch (error) {
        console.error('Error saving config', error);
        alert('Failed to save configuration');
    } finally {
        this.loading.set(false);
    }
  }
}
