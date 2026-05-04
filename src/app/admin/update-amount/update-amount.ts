import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-update-amount',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-amount.html',
  styleUrl: './update-amount.scss'
})
export class UpdateAmount implements OnChanges {

  @Input() show = false;
  @Input() actionType: string = '';
  @Input() rowData: any;
  @Input() prefilledWallet: any = '';   // ⭐ NEW — wallet passed from UserDetail

  @Output() close = new EventEmitter<void>();
  @Output() submitData = new EventEmitter<any>();

  @Input() walletName: string = '';


  formData = {
    screen: '',
    wallet: '',
    amount: '',
    description: '',
    action: ""
  };

  ngOnChanges() {
    if (this.actionType && this.rowData) {

      // Set action dropdown (Credit / Debit)
      this.formData.action = 'Credit';
      this.formData.screen = this.actionType === 'Credit' ? 'Deposit' : 'Withdraw';

      // Determine if it's Working Wallet (Deposit) or Withdrawal Wallet
      const isDeposit = this.actionType === 'Credit';

      // LABEL: Working Wallet / Withdrawal Wallet
      this.formData.wallet =
        isDeposit ? 'Working Wallet' : 'Withdrawal Wallet';

      // AMOUNT: Pre-fill current amount (wallet is Working, earnings is Withdrawal)
      this.formData.amount =
        isDeposit ? this.rowData.wallet : this.rowData.earnings;
    }

    console.log("Wallet coming from UserDetail:", this.actionType);
    this.formData['amount'] = '';
    this.formData['description'] = '';

  }


  closeModal() {
    this.close.emit();
  }

  submitForm() {
    this.submitData.emit({ ...this.formData, row: this.rowData });
    this.closeModal();
  }
}