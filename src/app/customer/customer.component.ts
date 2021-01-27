import {ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomerComponent),
      multi: true,
    }
  ]
})
export class CustomerComponent implements ControlValueAccessor, OnInit, OnDestroy{
  public customerFormGroup = new FormControl(null);

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private cd: ChangeDetectorRef) {

  }

  inCustomerData: any;

  private onChange = (value: any) => {};
  private onTouched = (value: any) => { };

  ngOnInit(): void {
    this.customerFormGroup.valueChanges
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((data: any) => {
        this.onChange(data);
        // this.cd.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(obj: any): void {
  }

  setInCustomerData(): void {
    this.inCustomerData = '90';
    // this.cd.detectChanges();
    // this.cd.markForCheck();
  }
}
