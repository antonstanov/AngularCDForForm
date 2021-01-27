import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-in-customer',
  templateUrl: './in-customer.component.html',
  styleUrls: ['./in-customer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InCustomerComponent),
      multi: true,
    }
  ]
})
export class InCustomerComponent implements ControlValueAccessor, OnDestroy, OnInit, OnChanges {
  @Input() inCustomerData: any;

  public inCustomerFormData = new FormGroup({
    name: new FormControl(null),
    subName: new FormControl(null),
  });

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private cd: ChangeDetectorRef) {

  }

  private onChange = (value: any) => {};
  private onTouched = (value: any) => { };

  ngOnInit(): void {
    this.inCustomerFormData.valueChanges
      .pipe(
        filter(Boolean),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        debounceTime(300),
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

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);

    if (changes.inCustomerData && !changes.inCustomerData.firstChange) {
      this.inCustomerFormDataChangeHandler(changes.inCustomerData.currentValue);
    }
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

  public inCustomerButtonClickHandler(value?: any): void {
    console.log('inCustomerButtonClickHandler init');
  }

  public inCustomerFormDataChangeHandler(value?: any): void {
    console.log('inCustomerButtonClickHandler init');
    this.inCustomerFormData.patchValue({
      name: value || this.inCustomerData
    });
  }
}
