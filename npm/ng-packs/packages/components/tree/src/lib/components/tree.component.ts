import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NzFormatEmitEvent, NzFormatBeforeDropEvent } from 'ng-zorro-antd/tree';
import { of } from 'rxjs';

export type DropEvent = NzFormatEmitEvent & { pos: number };

@Component({
  selector: 'abp-tree',
  templateUrl: 'tree.component.html',
  styleUrls: [
    '../../../../../../node_modules/ng-zorro-antd/tree/style/index.min.css',
    'tree.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TreeComponent {
  dropPosition: number;

  @ContentChild('menu') menu: TemplateRef<any>;
  @Output() readonly checkedKeysChange = new EventEmitter();
  @Output() readonly expandedKeysChange = new EventEmitter<string[]>();
  @Output() readonly selectedNodeChange = new EventEmitter();
  @Output() readonly dropOver = new EventEmitter<DropEvent>();
  @Input() draggable: boolean;
  @Input() checkable: boolean;
  @Input() checkStrictly: boolean;
  @Input() checkedKeys = [];
  @Input() nodes = [];
  @Input() expandedKeys: string[] = [];
  @Input() selectedNode: any;
  @Input() isNodeSelected = node => this.selectedNode?.id === node.key;
  @Input() beforeDrop = (event: NzFormatBeforeDropEvent) => {
    this.dropPosition = event.pos;
    return of(false);
  };

  onSelectedNodeChange(node) {
    this.selectedNode = node.origin.entity;
    this.selectedNodeChange.emit(node.origin.entity);
  }

  onCheckboxChange(event) {
    this.checkedKeys = [...event.keys];
    this.checkedKeysChange.emit(event.keys);
  }

  onExpandedKeysChange(event) {
    this.expandedKeys = [...event.keys];
    this.expandedKeysChange.emit(event.keys);
  }

  onDrop(event: DropEvent) {
    event.event.stopPropagation();
    event.event.preventDefault();
    event.pos = this.dropPosition;

    this.dropOver.emit(event);
  }
}
