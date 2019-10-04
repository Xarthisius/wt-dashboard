import { Component, OnInit } from '@angular/core';
// import { Workspace } from '@api/models/workspace';   // TODO: Missing model
// import { WorkspaceService } from '@api/services/workspace.service';
import { Tale } from '@api/models/tale';
import { TaleService } from '@api/services/tale.service';
import { LogService }  from '@framework/core/log.service';

enum AccessLevel {
    None = -1,
    Read = 0,
    Write = 1,
    Admin = 2
}

@Component({
  templateUrl: './tale-workspaces-dialog.component.html',
  styleUrls: ['./tale-workspaces-dialog.component.scss']
})
export class TaleWorkspacesDialogComponent implements OnInit {
  selectedNav = 'tale_workspaces';
  tales: Array<Tale> = [];

  selected: Array<Tale> = [];

  constructor(private logger: LogService, private taleService: TaleService) {}

  get move(): { action: string, selected: Array<Tale> }  {
    return { action: 'move', selected: this.selected };
  }

  get copy(): { action: string, selected: Array<Tale> } {
    return { action: 'copy', selected: this.selected };
  }

  ngOnInit(): void {
    const params = { level: AccessLevel.Read };
    this.taleService.taleListTales(params).subscribe(tales => {
      this.tales = tales;
    }, err => {
      this.logger.error("Failed to fetch Tales:", err)
    });
  }
  
  toggledCheckbox(e: any, tale: Tale): void {
    if (e.target.checked) {
      this.selected.push(tale);
    } else {
      const index = this.selected.indexOf(tale);
      this.selected.splice(index, 1);
    }
  }

  trackById(index: number, workspace: any): string {
    return workspace._id;
  }

  isNavActive(nav: string): boolean {
    return this.selectedNav === nav;
  }

  activateNav(nav: string): void {
    this.selectedNav = nav;
  }
}
