import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule, LAYOUT_CONFIG } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { FileSizePipe } from '@framework/core/filesize.pipe';
import { TruncatePipe } from '@framework/core/truncate.pipe';

export const APP_LAYOUT_CONFIG = {
  addFlexToParent: true,
  addOrientationBps: false,
  disableDefaultBps: false,
  disableVendorPrefixes: false,
  serverLoaded: false,
  useColumnBasisZero: false
};

@NgModule({
  declarations: [TruncatePipe, FileSizePipe],
  exports: [CommonModule, FormsModule, FlexLayoutModule, TranslateModule, TruncatePipe, FileSizePipe],
  providers: [
    {
      provide: LAYOUT_CONFIG,
      useValue: APP_LAYOUT_CONFIG
    }
  ]
})
export class SharedModule {}
