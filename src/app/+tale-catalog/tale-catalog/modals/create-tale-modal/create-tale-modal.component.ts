import { AfterViewInit, Component, Inject, NgZone, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Image } from '@api/models/image';
import { Tale } from '@api/models/tale';
import { ImageService } from '@api/services/image.service';
import { LogService } from '@framework/core/log.service';

// import * as $ from 'jquery';
declare var $: any;

@Component({
  templateUrl: './create-tale-modal.component.html',
  styleUrls: ['./create-tale-modal.component.scss']
})
export class CreateTaleModalComponent implements OnInit,AfterViewInit {
  newTale: Tale;
  datasetCitation: any;
  asTale = false;
  gitUrl = '';

  showGit = false;

  environments: Array<Image> = [];

  constructor(
      private zone: NgZone,
      public dialogRef: MatDialogRef<CreateTaleModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { params: any, showGit: boolean },
      private imageService: ImageService,
      private logger: LogService
    ) {
    this.newTale = {
      title: (data && data.params) ? data.params.name : '',
      imageId: '',
      authors: [],
      license: 'CC-BY-4.0',
      category: 'science',
      publishInfo: [],
      dataSet: [],
      public: false,
      copyOfTale: undefined,
      description: '### Provide a description for your Tale'
    };
    this.showGit = data.showGit;
  }

  ngOnInit(): void {
    this.parseParameters();
  }

  ngAfterViewInit():void {
    $('.ui.checkbox').checkbox();
  }

  result(): { tale: Tale, asTale: boolean, url?: string } {
    if (this.data.showGit) {
      return { tale: this.newTale, asTale: this.asTale, url: this.gitUrl };
    } else {
      return { tale: this.newTale, asTale: this.asTale };
    }
  }

  parseParameters(): void {
    // TODO: "Analyze in WT" case - Parse querystring to pre-populate dataSet/imageId/title
    this.zone.run(() => {
      $('.ui.dropdown').dropdown();
    });

    if (this.data && this.data.params && this.data.params.uri) {
      this.zone.run(() => {
        // TODO: Fetch / display data citation from datacite?
        this.datasetCitation = { doi: this.data.params.uri };
      });

      // Set read/write radio buttons using asTale value
      if (this.data.params.asTale) {
        setTimeout(() => {
          $('#readWriteRadio').click();
        }, 350);
      }
    }

    // Fetch all Tale environment Images
    const listImagesParams = { limit: 0 };
    this.imageService.imageListImages(listImagesParams).subscribe(images => {
      this.zone.run(() => {
        this.environments = images;

        // If user specified an environment as a parameter, select it by default
        if (this.data && this.data.params && this.data.params.environment) {
          // Search for matching name
          const match = this.environments.find(env => env.name === this.data.params.environment);
          if (match) {
            // If found, select it in the dropdown
            this.newTale.imageId = match._id;
          } else {
            this.logger.error(`Failed to find an environment named ${this.data.params.environment}`);
          }
        }
      });
    }, err => {
      this.logger.error("Failed to list images:", err);
    });
  }

  enableReadOnly(evt: any): void {
    this.logger.info("Enabling read only on this Tale...");
    const target = evt.target;
    if (target.checked) {
      this.asTale = false;
    }
  }

  enableReadWrite(evt: any): void {
    this.logger.info("Enabling read/write on this Tale...");
    const target = evt.target;
    if (target.checked) {
      this.asTale = true;
    }
  }

  trackById(index: number, env: Image): string {
    return env._id;
  }
}
