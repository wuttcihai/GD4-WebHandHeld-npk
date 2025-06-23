import {
  MdbCollapseDirective,
  MdbCollapseModule
} from "./chunk-M3KAMD6J.js";
import {
  coerceBooleanProperty
} from "./chunk-3EENIVFQ.js";
import {
  CommonModule,
  NgIf,
  NgTemplateOutlet
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  InjectionToken,
  Input,
  NgModule,
  Output,
  TemplateRef,
  ViewChild,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  merge,
  startWith,
  switchMap
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-accordion.mjs
function MdbAccordionItemComponent_3_ng_template_0_Template(rf, ctx) {
}
function MdbAccordionItemComponent_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MdbAccordionItemComponent_3_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0._headerTemplate);
  }
}
function MdbAccordionItemComponent_6_ng_template_0_Template(rf, ctx) {
}
function MdbAccordionItemComponent_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MdbAccordionItemComponent_6_ng_template_0_Template, 0, 0, "ng-template", 5);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0._bodyTemplate);
  }
}
var _c0 = ["*"];
var MDB_ACCORDION_ITEM_BODY = new InjectionToken("MdbAccordionItemBodyDirective");
var MdbAccordionItemBodyDirective = class _MdbAccordionItemBodyDirective {
  template;
  constructor(template) {
    this.template = template;
  }
  static ɵfac = function MdbAccordionItemBodyDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbAccordionItemBodyDirective)(ɵɵdirectiveInject(TemplateRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbAccordionItemBodyDirective,
    selectors: [["", "mdbAccordionItemBody", ""]],
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: MDB_ACCORDION_ITEM_BODY,
      useExisting: _MdbAccordionItemBodyDirective
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbAccordionItemBodyDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbAccordionItemBody]",
      providers: [{
        provide: MDB_ACCORDION_ITEM_BODY,
        useExisting: MdbAccordionItemBodyDirective
      }]
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var MDB_ACCORDION_ITEM_HEADER = new InjectionToken("MdbAccordionItemHeaderDirective");
var MdbAccordionItemHeaderDirective = class _MdbAccordionItemHeaderDirective {
  template;
  constructor(template) {
    this.template = template;
  }
  static ɵfac = function MdbAccordionItemHeaderDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbAccordionItemHeaderDirective)(ɵɵdirectiveInject(TemplateRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbAccordionItemHeaderDirective,
    selectors: [["", "mdbAccordionItemHeader", ""]],
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: MDB_ACCORDION_ITEM_HEADER,
      useExisting: _MdbAccordionItemHeaderDirective
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbAccordionItemHeaderDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbAccordionItemHeader]",
      providers: [{
        provide: MDB_ACCORDION_ITEM_HEADER,
        useExisting: MdbAccordionItemHeaderDirective
      }]
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var uniqueHeaderId = 0;
var uniqueId = 0;
var MdbAccordionItemComponent = class _MdbAccordionItemComponent {
  _cdRef;
  _headerTemplate;
  _bodyTemplate;
  collapse;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled = false;
  header;
  set collapsed(value) {
    if (!this._isInitialized) {
      if (!value) {
        this._shouldOpenOnInit = true;
      }
      return;
    }
    if (value) {
      this.hide();
    } else {
      this.show();
    }
  }
  id = `mdb-accordion-item-${uniqueId++}`;
  _headerId = `mdb-accordion-item-header-${uniqueHeaderId++}`;
  _isInitialized = false;
  _shouldOpenOnInit = false;
  itemShow = new EventEmitter();
  itemShown = new EventEmitter();
  itemHide = new EventEmitter();
  itemHidden = new EventEmitter();
  accordionItem = true;
  accordionItemDisplayBlock = true;
  ngOnInit() {
    this._isInitialized = true;
    if (this._shouldOpenOnInit) {
      this.show();
    }
  }
  show$ = new Subject();
  _collapsed = true;
  _addCollapsedClass = true;
  constructor(_cdRef) {
    this._cdRef = _cdRef;
  }
  toggle() {
    if (this.disabled) {
      return;
    }
    this.collapse.toggle();
  }
  show() {
    this.collapse.show();
    this._cdRef.markForCheck();
  }
  hide() {
    this.collapse.hide();
    this._cdRef.markForCheck();
  }
  onShow() {
    this._addCollapsedClass = false;
    this.itemShow.emit(this);
    this.show$.next(this);
  }
  onHide() {
    this._addCollapsedClass = true;
    this.itemHide.emit(this);
  }
  onShown() {
    this._collapsed = false;
    this.itemShown.emit(this);
  }
  onHidden() {
    this._collapsed = true;
    this.itemHidden.emit(this);
  }
  static ngAcceptInputType_disabled;
  static ɵfac = function MdbAccordionItemComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbAccordionItemComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbAccordionItemComponent,
    selectors: [["mdb-accordion-item"]],
    contentQueries: function MdbAccordionItemComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MDB_ACCORDION_ITEM_HEADER, 7, TemplateRef);
        ɵɵcontentQuery(dirIndex, MDB_ACCORDION_ITEM_BODY, 7, TemplateRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._headerTemplate = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._bodyTemplate = _t.first);
      }
    },
    viewQuery: function MdbAccordionItemComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(MdbCollapseDirective, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.collapse = _t.first);
      }
    },
    hostVars: 4,
    hostBindings: function MdbAccordionItemComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("accordion-item", ctx.accordionItem)("d-block", ctx.accordionItemDisplayBlock);
      }
    },
    inputs: {
      disabled: "disabled",
      header: "header",
      collapsed: "collapsed",
      id: "id"
    },
    outputs: {
      itemShow: "itemShow",
      itemShown: "itemShown",
      itemHide: "itemHide",
      itemHidden: "itemHidden"
    },
    standalone: false,
    decls: 7,
    vars: 11,
    consts: [[1, "accordion-header", 3, "id"], ["type", "button", 1, "accordion-button", 3, "click"], [4, "ngIf"], ["mdbCollapse", "", 3, "collapseShow", "collapseHide", "collapseShown", "collapseHidden"], [1, "accordion-body"], [3, "ngTemplateOutlet"]],
    template: function MdbAccordionItemComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "h2", 0)(1, "button", 1);
        ɵɵlistener("click", function MdbAccordionItemComponent_Template_button_click_1_listener() {
          return ctx.toggle();
        });
        ɵɵtext(2);
        ɵɵtemplate(3, MdbAccordionItemComponent_3_Template, 1, 1, null, 2);
        ɵɵelementEnd()();
        ɵɵelementStart(4, "div", 3);
        ɵɵlistener("collapseShow", function MdbAccordionItemComponent_Template_div_collapseShow_4_listener() {
          return ctx.onShow();
        })("collapseHide", function MdbAccordionItemComponent_Template_div_collapseHide_4_listener() {
          return ctx.onHide();
        })("collapseShown", function MdbAccordionItemComponent_Template_div_collapseShown_4_listener() {
          return ctx.onShown();
        })("collapseHidden", function MdbAccordionItemComponent_Template_div_collapseHidden_4_listener() {
          return ctx.onHidden();
        });
        ɵɵelementStart(5, "div", 4);
        ɵɵtemplate(6, MdbAccordionItemComponent_6_Template, 1, 1, null, 2);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵproperty("id", ctx._headerId);
        ɵɵadvance();
        ɵɵclassProp("collapsed", ctx._addCollapsedClass);
        ɵɵattribute("aria-expanded", !ctx._collapsed)("aria-controls", ctx.id)("disabled", ctx.disabled ? "" : null);
        ɵɵadvance();
        ɵɵtextInterpolate1(" ", ctx.header, " ");
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx._headerTemplate);
        ɵɵadvance();
        ɵɵattribute("id", ctx.id)("aria-labelledby", ctx._headerId);
        ɵɵadvance(2);
        ɵɵproperty("ngIf", ctx._bodyTemplate);
      }
    },
    dependencies: [NgIf, NgTemplateOutlet, MdbCollapseDirective],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbAccordionItemComponent, [{
    type: Component,
    args: [{
      selector: "mdb-accordion-item",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `<h2 class="accordion-header" [id]="_headerId">
  <button
    class="accordion-button"
    type="button"
    [attr.aria-expanded]="!_collapsed"
    [attr.aria-controls]="id"
    [attr.disabled]="disabled ? '' : null"
    [class.collapsed]="_addCollapsedClass"
    (click)="toggle()"
  >
    {{ header }}
    <ng-template *ngIf="_headerTemplate" [ngTemplateOutlet]="_headerTemplate"></ng-template>
  </button>
</h2>
<div
  mdbCollapse
  (collapseShow)="onShow()"
  (collapseHide)="onHide()"
  (collapseShown)="onShown()"
  (collapseHidden)="onHidden()"
  [attr.id]="id"
  [attr.aria-labelledby]="_headerId"
>
  <div class="accordion-body">
    <ng-template *ngIf="_bodyTemplate" [ngTemplateOutlet]="_bodyTemplate"></ng-template>
  </div>
</div>
`
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    _headerTemplate: [{
      type: ContentChild,
      args: [MDB_ACCORDION_ITEM_HEADER, {
        read: TemplateRef,
        static: true
      }]
    }],
    _bodyTemplate: [{
      type: ContentChild,
      args: [MDB_ACCORDION_ITEM_BODY, {
        read: TemplateRef,
        static: true
      }]
    }],
    collapse: [{
      type: ViewChild,
      args: [MdbCollapseDirective, {
        static: true
      }]
    }],
    disabled: [{
      type: Input
    }],
    header: [{
      type: Input
    }],
    collapsed: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    itemShow: [{
      type: Output
    }],
    itemShown: [{
      type: Output
    }],
    itemHide: [{
      type: Output
    }],
    itemHidden: [{
      type: Output
    }],
    accordionItem: [{
      type: HostBinding,
      args: ["class.accordion-item"]
    }],
    accordionItemDisplayBlock: [{
      type: HostBinding,
      args: ["class.d-block"]
    }]
  });
})();
var MdbAccordionComponent = class _MdbAccordionComponent {
  items;
  get borderless() {
    return this._borderless;
  }
  set borderless(value) {
    this._borderless = coerceBooleanProperty(value);
  }
  _borderless = false;
  get flush() {
    return this._flush;
  }
  set flush(value) {
    this._flush = coerceBooleanProperty(value);
  }
  _flush = false;
  get multiple() {
    return this._multiple;
  }
  set multiple(value) {
    this._multiple = coerceBooleanProperty(value);
  }
  _multiple = false;
  accordion = true;
  get addBorderlessClass() {
    return this.borderless;
  }
  get addFlushClass() {
    return this.flush;
  }
  constructor() {
  }
  ngAfterContentInit() {
    this.items.changes.pipe(startWith(this.items), switchMap((items) => {
      return merge(...items.map((item) => item.show$));
    })).subscribe((clickedItem) => this._handleMultipleItems(clickedItem));
  }
  _handleMultipleItems(clickedItem) {
    if (!this.multiple) {
      const itemsToClose = this.items.filter((item) => item !== clickedItem && !item._collapsed);
      itemsToClose.forEach((item) => item.hide());
    }
  }
  static ngAcceptInputType_borderless;
  static ngAcceptInputType_flush;
  static ngAcceptInputType_multiple;
  static ɵfac = function MdbAccordionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbAccordionComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbAccordionComponent,
    selectors: [["mdb-accordion"]],
    contentQueries: function MdbAccordionComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MdbAccordionItemComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.items = _t);
      }
    },
    hostVars: 6,
    hostBindings: function MdbAccordionComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("accordion", ctx.accordion)("accordion-borderless", ctx.addBorderlessClass)("accordion-flush", ctx.addFlushClass);
      }
    },
    inputs: {
      borderless: "borderless",
      flush: "flush",
      multiple: "multiple"
    },
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MdbAccordionComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbAccordionComponent, [{
    type: Component,
    args: [{
      selector: "mdb-accordion",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: "<ng-content></ng-content>\n"
    }]
  }], () => [], {
    items: [{
      type: ContentChildren,
      args: [MdbAccordionItemComponent]
    }],
    borderless: [{
      type: Input
    }],
    flush: [{
      type: Input
    }],
    multiple: [{
      type: Input
    }],
    accordion: [{
      type: HostBinding,
      args: ["class.accordion"]
    }],
    addBorderlessClass: [{
      type: HostBinding,
      args: ["class.accordion-borderless"]
    }],
    addFlushClass: [{
      type: HostBinding,
      args: ["class.accordion-flush"]
    }]
  });
})();
var MdbAccordionModule = class _MdbAccordionModule {
  static ɵfac = function MdbAccordionModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbAccordionModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbAccordionModule,
    declarations: [MdbAccordionComponent, MdbAccordionItemComponent, MdbAccordionItemHeaderDirective, MdbAccordionItemBodyDirective],
    imports: [CommonModule, MdbCollapseModule],
    exports: [MdbAccordionComponent, MdbAccordionItemComponent, MdbAccordionItemHeaderDirective, MdbAccordionItemBodyDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, MdbCollapseModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbAccordionModule, [{
    type: NgModule,
    args: [{
      declarations: [MdbAccordionComponent, MdbAccordionItemComponent, MdbAccordionItemHeaderDirective, MdbAccordionItemBodyDirective],
      imports: [CommonModule, MdbCollapseModule],
      exports: [MdbAccordionComponent, MdbAccordionItemComponent, MdbAccordionItemHeaderDirective, MdbAccordionItemBodyDirective]
    }]
  }], null, null);
})();
export {
  MdbAccordionComponent,
  MdbAccordionItemBodyDirective,
  MdbAccordionItemComponent,
  MdbAccordionItemHeaderDirective,
  MdbAccordionModule
};
//# sourceMappingURL=mdb-angular-ui-kit_accordion.js.map
