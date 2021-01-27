import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {map, takeUntil} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'my-app';

  form = new FormGroup({
    customer: new FormControl({
      name: null,
      subName: null
    })
  });

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(data => {
        console.log(data);
        this.cd.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  update(): void{
    // console.log(this.form.value);
  }
}
