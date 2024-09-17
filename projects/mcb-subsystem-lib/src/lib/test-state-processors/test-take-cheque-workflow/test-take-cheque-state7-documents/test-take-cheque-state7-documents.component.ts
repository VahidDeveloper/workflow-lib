import { NgForm } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { Breadcrumb, BreadcrumbItem, UIService } from 'angular-infra';

import { RequestCommitDto, RequestActionEntity } from '../../../common/types';
import { WorkflowService } from '../../../common/services/workflow-service';
import { RequestActionService } from '../../../common/services/request-action.service';

@Component({
  selector: 'lib-test-take-cheque-state7-documents',
  templateUrl: './test-take-cheque-state7-documents.component.html'
})

export class TestTakeChequeState7DocumentsComponent {
  @Breadcrumb() breadcrumb: BreadcrumbItem = { textKey: 'State7-Documents' };
  @ViewChild('form') form: NgForm;

  model = {
    DestinationAccount: '',
    final: ''
  };
  requestActions: RequestActionEntity[];
  requestCommitDto: RequestCommitDto = {} as RequestCommitDto;
  transition: any;

  constructor(
    private ui: UIService,
    private workflowService: WorkflowService,
    private service: RequestActionService,
  ) {
    this.requestActions = workflowService.cartableItem.requestActions;
  }

  onSubmit() {
    this.transition ? this.requestCommitDto.expressionData = this.transition : null;
    this.requestCommitDto.requestAction = {} as any;
    this.requestCommitDto.requestAction.id = this.requestActions[ 0 ].id;
    this.requestCommitDto.requestDataValue = this.model;
    this.service.commit(this.requestCommitDto).subscribe(x => {
      this.ui.showToast('saved');
      this.workflowService.goToCartablePage();
      this.form.resetForm();
    });
  }
}