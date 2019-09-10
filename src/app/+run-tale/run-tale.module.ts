import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FilesModule } from '@files/files.module';
import { TruncatePipe } from '@framework/core/truncate.pipe';
import { SafePipe } from '@framework/core/safe.pipe';
import { TalesModule } from '@tales/tales.module';

import { SharedModule } from '~/app/framework/core';
import { MaterialModule } from '~/app/framework/material';

import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

import { TaleInteractComponent } from './run-tale/tale-interact/tale-interact.component';
import { TaleFilesComponent } from './run-tale/tale-files/tale-files.component';
import { TaleMetadataComponent } from './run-tale/tale-metadata/tale-metadata.component';
import { RunTaleComponent } from './run-tale/run-tale.component';
import { routes } from './run-tale.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule, MaterialModule, FilesModule, TalesModule, MarkdownModule.forRoot({
    // loader: HttpClient, // optional, only if you use [src] attribute
    /* markedOptions: {
      provide: MarkedOptions,
      useValue: {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
      },
    },*/
  })],
  providers: [TruncatePipe, SafePipe],
  declarations: [RunTaleComponent, TaleFilesComponent, TaleMetadataComponent, TaleInteractComponent]
})
export class RunTaleModule {}
