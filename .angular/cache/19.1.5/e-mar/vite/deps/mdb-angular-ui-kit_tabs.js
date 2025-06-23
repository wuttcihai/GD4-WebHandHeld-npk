import {
  CdkPortalOutlet,
  PortalModule,
  TemplatePortal
} from "./chunk-AWQ4ECAQ.js";
import {
  coerceBooleanProperty
} from "./chunk-3EENIVFQ.js";
import {
  CommonModule,
  DOCUMENT,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-35LGTL4I.js";
import {
  Component,
  ComponentFactoryResolver$1,
  ContentChild,
  ContentChildren,
  Directive,
  EventEmitter,
  HostBinding,
  Inject,
  InjectionToken,
  Input,
  NgModule,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵpureFunction6,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-tabs.mjs
var _c0 = ["*"];
function MdbTabComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0);
  }
}
var _c1 = (a0, a1, a2, a3, a4, a5) => ({
  "nav-pills": a0,
  "nav-tabs": a1,
  "nav-fill": a2,
  "nav-justified": a3,
  "flex-column": a4,
  "text-center": a5
});
var _c2 = (a0, a1, a2) => ({
  fade: a0,
  active: a1,
  show: a2
});
function MdbTabsComponent_li_1_ng_template_2_ng_template_0_Template(rf, ctx) {
}
function MdbTabsComponent_li_1_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, MdbTabsComponent_li_1_ng_template_2_ng_template_0_Template, 0, 0, "ng-template", 6);
  }
  if (rf & 2) {
    const tab_r4 = ɵɵnextContext().$implicit;
    ɵɵproperty("cdkPortalOutlet", tab_r4.titleContent);
  }
}
function MdbTabsComponent_li_1_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtext(0);
  }
  if (rf & 2) {
    const tab_r4 = ɵɵnextContext().$implicit;
    ɵɵtextInterpolate(tab_r4.title);
  }
}
function MdbTabsComponent_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 3);
    ɵɵlistener("click", function MdbTabsComponent_li_1_Template_li_click_0_listener() {
      const i_r2 = ɵɵrestoreView(_r1).index;
      const ctx_r2 = ɵɵnextContext();
      return ɵɵresetView(ctx_r2.setActiveTab(i_r2));
    });
    ɵɵelementStart(1, "a", 4);
    ɵɵtemplate(2, MdbTabsComponent_li_1_ng_template_2_Template, 1, 1, "ng-template", 5)(3, MdbTabsComponent_li_1_ng_template_3_Template, 1, 1, "ng-template", 5);
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const tab_r4 = ctx.$implicit;
    ɵɵadvance();
    ɵɵclassProp("active", tab_r4.active)("disabled", tab_r4.disabled);
    ɵɵadvance();
    ɵɵproperty("ngIf", tab_r4.titleContent);
    ɵɵadvance();
    ɵɵproperty("ngIf", !tab_r4.titleContent);
  }
}
function MdbTabsComponent_ng_container_3_ng_template_2_Template(rf, ctx) {
}
function MdbTabsComponent_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵelementStart(1, "div", 7);
    ɵɵtemplate(2, MdbTabsComponent_ng_container_3_ng_template_2_Template, 0, 0, "ng-template", 8);
    ɵɵelementEnd();
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const tab_r5 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("ngClass", ɵɵpureFunction3(2, _c2, tab_r5.fade, tab_r5.active, tab_r5.show));
    ɵɵadvance();
    ɵɵproperty("tab", tab_r5);
  }
}
var MDB_TAB_CONTENT = new InjectionToken("MdbTabContentDirective");
var MdbTabContentDirective = class _MdbTabContentDirective {
  template;
  constructor(template) {
    this.template = template;
  }
  static ɵfac = function MdbTabContentDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbTabContentDirective)(ɵɵdirectiveInject(TemplateRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbTabContentDirective,
    selectors: [["", "mdbTabContent", ""]],
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: MDB_TAB_CONTENT,
      useExisting: _MdbTabContentDirective
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbTabContentDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbTabContent]",
      providers: [{
        provide: MDB_TAB_CONTENT,
        useExisting: MdbTabContentDirective
      }]
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var MDB_TAB_TITLE = new InjectionToken("MdbTabTitleDirective");
var MdbTabTitleDirective = class _MdbTabTitleDirective {
  template;
  constructor(template) {
    this.template = template;
  }
  static ɵfac = function MdbTabTitleDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbTabTitleDirective)(ɵɵdirectiveInject(TemplateRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbTabTitleDirective,
    selectors: [["", "mdbTabTitle", ""]],
    standalone: false,
    features: [ɵɵProvidersFeature([{
      provide: MDB_TAB_TITLE,
      useExisting: _MdbTabTitleDirective
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbTabTitleDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbTabTitle]",
      providers: [{
        provide: MDB_TAB_TITLE,
        useExisting: MdbTabTitleDirective
      }]
    }]
  }], () => [{
    type: TemplateRef
  }], null);
})();
var SHOW_TRANSITION_DELAY = 150;
var TRANSITION_PADDING = 5;
var MdbTabComponent = class _MdbTabComponent {
  _vcr;
  _lazyContent;
  _titleContent;
  _content;
  activeStateChange$ = new Subject();
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled = false;
  get fade() {
    return this._fade;
  }
  set fade(value) {
    this._fade = coerceBooleanProperty(value);
  }
  _fade = true;
  title;
  get content() {
    return this._contentPortal;
  }
  get titleContent() {
    return this._titlePortal;
  }
  get shouldAttach() {
    return this._lazyContent === void 0;
  }
  _contentPortal = null;
  _titlePortal = null;
  get active() {
    return this._active;
  }
  set active(value) {
    this._active = coerceBooleanProperty(value);
    this.activeStateChange$.next(value);
  }
  _active = false;
  get show() {
    return this._show;
  }
  set show(value) {
    setTimeout(() => {
      this._show = coerceBooleanProperty(value);
    }, SHOW_TRANSITION_DELAY + TRANSITION_PADDING);
  }
  _show = true;
  constructor(_vcr) {
    this._vcr = _vcr;
  }
  ngOnInit() {
    this._createContentPortal();
    if (this._titleContent) {
      this._createTitlePortal();
    }
  }
  _createContentPortal() {
    const content = this._lazyContent || this._content;
    this._contentPortal = new TemplatePortal(content, this._vcr);
  }
  _createTitlePortal() {
    this._titlePortal = new TemplatePortal(this._titleContent, this._vcr);
  }
  static ngAcceptInputType_disabled;
  static ɵfac = function MdbTabComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbTabComponent)(ɵɵdirectiveInject(ViewContainerRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbTabComponent,
    selectors: [["mdb-tab"]],
    contentQueries: function MdbTabComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MDB_TAB_CONTENT, 7, TemplateRef);
        ɵɵcontentQuery(dirIndex, MDB_TAB_TITLE, 7, TemplateRef);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._lazyContent = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._titleContent = _t.first);
      }
    },
    viewQuery: function MdbTabComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(TemplateRef, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._content = _t.first);
      }
    },
    inputs: {
      disabled: "disabled",
      fade: "fade",
      title: "title"
    },
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MdbTabComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵtemplate(0, MdbTabComponent_ng_template_0_Template, 1, 0, "ng-template");
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbTabComponent, [{
    type: Component,
    args: [{
      selector: "mdb-tab",
      template: "<ng-template><ng-content></ng-content></ng-template>\n"
    }]
  }], () => [{
    type: ViewContainerRef
  }], {
    _lazyContent: [{
      type: ContentChild,
      args: [MDB_TAB_CONTENT, {
        read: TemplateRef,
        static: true
      }]
    }],
    _titleContent: [{
      type: ContentChild,
      args: [MDB_TAB_TITLE, {
        read: TemplateRef,
        static: true
      }]
    }],
    _content: [{
      type: ViewChild,
      args: [TemplateRef, {
        static: true
      }]
    }],
    disabled: [{
      type: Input
    }],
    fade: [{
      type: Input
    }],
    title: [{
      type: Input
    }]
  });
})();
var MdbTabPortalOutlet = class _MdbTabPortalOutlet extends CdkPortalOutlet {
  _destroy$ = new Subject();
  tab;
  constructor(_cfr, _vcr, _document) {
    super(_cfr, _vcr, _document);
  }
  ngOnInit() {
    super.ngOnInit();
    if ((this.tab.shouldAttach || this.tab.active) && !this.hasAttached()) {
      this.attach(this.tab.content);
    } else {
      this.tab.activeStateChange$.pipe(takeUntil(this._destroy$)).subscribe((isActive) => {
        if (isActive && !this.hasAttached()) {
          this.attach(this.tab.content);
        }
      });
    }
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
    super.ngOnDestroy();
  }
  static ɵfac = function MdbTabPortalOutlet_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbTabPortalOutlet)(ɵɵdirectiveInject(ComponentFactoryResolver$1), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(DOCUMENT));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbTabPortalOutlet,
    selectors: [["", "mdbTabPortalOutlet", ""]],
    inputs: {
      tab: "tab"
    },
    standalone: false,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbTabPortalOutlet, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbTabPortalOutlet]"
    }]
  }], () => [{
    type: ComponentFactoryResolver$1
  }, {
    type: ViewContainerRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    tab: [{
      type: Input
    }]
  });
})();
var MdbTabChange = class {
  index;
  tab;
};
var MdbTabsComponent = class _MdbTabsComponent {
  tabs;
  _destroy$ = new Subject();
  get fill() {
    return this._fill;
  }
  set fill(value) {
    this._fill = coerceBooleanProperty(value);
  }
  _fill = false;
  get justified() {
    return this._justified;
  }
  set justified(value) {
    this._justified = coerceBooleanProperty(value);
  }
  _justified = false;
  get pills() {
    return this._pills;
  }
  set pills(value) {
    this._pills = coerceBooleanProperty(value);
  }
  _pills = false;
  get vertical() {
    return this._vertical;
  }
  set vertical(value) {
    this._vertical = coerceBooleanProperty(value);
  }
  _vertical = false;
  navColumnClass = "col-3";
  contentColumnClass = "col-9";
  get navColClass() {
    return this.vertical ? this.navColumnClass : "";
  }
  get contentColClass() {
    return this.vertical ? this.contentColumnClass : "";
  }
  _selectedIndex;
  activeTabChange = new EventEmitter();
  constructor() {
  }
  ngAfterContentInit() {
    const firstActiveTabIndex = this.tabs.toArray().findIndex((tab) => !tab.disabled);
    this.setActiveTab(firstActiveTabIndex);
    this.tabs.changes.pipe(takeUntil(this._destroy$)).subscribe(() => {
      const hasActiveTab = this.tabs.find((tab) => tab.active);
      if (!hasActiveTab) {
        const closestTabIndex = this._getClosestTabIndex(this._selectedIndex);
        if (closestTabIndex !== -1) {
          this.setActiveTab(closestTabIndex);
        }
      }
    });
  }
  setActiveTab(index) {
    const activeTab = this.tabs.toArray()[index];
    if (!activeTab || activeTab && activeTab.disabled) {
      return;
    }
    this.tabs.forEach((tab) => tab.active = tab === activeTab);
    this.tabs.forEach((tab) => tab.show = tab === activeTab);
    this._selectedIndex = index;
    const tabChangeEvent = this._getTabChangeEvent(index, activeTab);
    this.activeTabChange.emit(tabChangeEvent);
  }
  _getTabChangeEvent(index, tab) {
    const event = new MdbTabChange();
    event.index = index;
    event.tab = tab;
    return event;
  }
  _getClosestTabIndex(index) {
    const tabs = this.tabs.toArray();
    const tabsLength = tabs.length;
    if (!tabsLength) {
      return -1;
    }
    for (let i = 1; i <= tabsLength; i += 1) {
      const prevIndex = index - i;
      const nextIndex = index + i;
      if (tabs[prevIndex] && !tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (tabs[nextIndex] && !tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }
    return -1;
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
  static ngAcceptInputType_fill;
  static ngAcceptInputType_justified;
  static ngAcceptInputType_pills;
  static ngAcceptInputType_vertical;
  static ɵfac = function MdbTabsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbTabsComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbTabsComponent,
    selectors: [["mdb-tabs"]],
    contentQueries: function MdbTabsComponent_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MdbTabComponent, 4);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tabs = _t);
      }
    },
    hostVars: 2,
    hostBindings: function MdbTabsComponent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("row", ctx.vertical);
      }
    },
    inputs: {
      fill: "fill",
      justified: "justified",
      pills: "pills",
      vertical: "vertical",
      navColumnClass: "navColumnClass",
      contentColumnClass: "contentColumnClass"
    },
    outputs: {
      activeTabChange: "activeTabChange"
    },
    standalone: false,
    decls: 4,
    vars: 16,
    consts: [["role", "tablist", 3, "ngClass"], ["class", "nav-item", "role", "presentation", 3, "click", 4, "ngFor", "ngForOf"], [4, "ngFor", "ngForOf"], ["role", "presentation", 1, "nav-item", 3, "click"], ["href", "javascript:void(0)", "role", "tab", 1, "nav-link"], [3, "ngIf"], [3, "cdkPortalOutlet"], [1, "tab-pane", 3, "ngClass"], ["mdbTabPortalOutlet", "", 3, "tab"]],
    template: function MdbTabsComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "ul", 0);
        ɵɵtemplate(1, MdbTabsComponent_li_1_Template, 4, 6, "li", 1);
        ɵɵelementEnd();
        ɵɵelementStart(2, "div");
        ɵɵtemplate(3, MdbTabsComponent_ng_container_3_Template, 3, 6, "ng-container", 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassMapInterpolate1("nav mb-3 flex-column ", ctx.navColClass, "");
        ɵɵproperty("ngClass", ɵɵpureFunction6(9, _c1, ctx.pills, !ctx.pills, ctx.fill, ctx.justified, ctx.vertical, ctx.vertical));
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.tabs);
        ɵɵadvance();
        ɵɵclassMapInterpolate1("tab-content ", ctx.contentColClass, "");
        ɵɵadvance();
        ɵɵproperty("ngForOf", ctx.tabs);
      }
    },
    dependencies: [NgClass, NgForOf, NgIf, CdkPortalOutlet, MdbTabPortalOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbTabsComponent, [{
    type: Component,
    args: [{
      selector: "mdb-tabs",
      template: `<ul
  class="nav mb-3 flex-column {{ navColClass }}"
  [ngClass]="{
    'nav-pills': pills,
    'nav-tabs': !pills,
    'nav-fill': fill,
    'nav-justified': justified,
    'flex-column': vertical,
    'text-center': vertical
  }"
  role="tablist"
>
  <li
    *ngFor="let tab of tabs; let i = index"
    (click)="setActiveTab(i)"
    class="nav-item"
    role="presentation"
  >
    <a
      href="javascript:void(0)"
      class="nav-link"
      [class.active]="tab.active"
      [class.disabled]="tab.disabled"
      role="tab"
    >
      <ng-template [ngIf]="tab.titleContent">
        <ng-template [cdkPortalOutlet]="tab.titleContent"></ng-template>
      </ng-template>

      <ng-template [ngIf]="!tab.titleContent">{{ tab.title }}</ng-template>
    </a>
  </li>
</ul>

<div class="tab-content {{ contentColClass }}">
  <!-- <ng-content select="mdb-tab"></ng-content> -->
  <ng-container *ngFor="let tab of tabs">
    <div
      class="tab-pane"
      [ngClass]="{
        fade: tab.fade,
        active: tab.active,
        show: tab.show
      }"
    >
      <ng-template mdbTabPortalOutlet [tab]="tab"></ng-template>
    </div>
  </ng-container>
</div>
`
    }]
  }], () => [], {
    tabs: [{
      type: ContentChildren,
      args: [MdbTabComponent]
    }],
    fill: [{
      type: Input
    }],
    justified: [{
      type: Input
    }],
    pills: [{
      type: Input
    }],
    vertical: [{
      type: HostBinding,
      args: ["class.row"]
    }, {
      type: Input
    }],
    navColumnClass: [{
      type: Input
    }],
    contentColumnClass: [{
      type: Input
    }],
    activeTabChange: [{
      type: Output
    }]
  });
})();
var MdbTabsModule = class _MdbTabsModule {
  static ɵfac = function MdbTabsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbTabsModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbTabsModule,
    declarations: [MdbTabComponent, MdbTabContentDirective, MdbTabTitleDirective, MdbTabPortalOutlet, MdbTabsComponent],
    imports: [CommonModule, PortalModule],
    exports: [MdbTabComponent, MdbTabContentDirective, MdbTabTitleDirective, MdbTabPortalOutlet, MdbTabsComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, PortalModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbTabsModule, [{
    type: NgModule,
    args: [{
      declarations: [MdbTabComponent, MdbTabContentDirective, MdbTabTitleDirective, MdbTabPortalOutlet, MdbTabsComponent],
      imports: [CommonModule, PortalModule],
      exports: [MdbTabComponent, MdbTabContentDirective, MdbTabTitleDirective, MdbTabPortalOutlet, MdbTabsComponent]
    }]
  }], null, null);
})();
export {
  MdbTabChange,
  MdbTabComponent,
  MdbTabContentDirective,
  MdbTabPortalOutlet,
  MdbTabTitleDirective,
  MdbTabsComponent,
  MdbTabsModule
};
//# sourceMappingURL=mdb-angular-ui-kit_tabs.js.map
