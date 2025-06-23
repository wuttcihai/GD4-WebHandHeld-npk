import {
  coerceBooleanProperty
} from "./chunk-3EENIVFQ.js";
import {
  DOCUMENT,
  isPlatformBrowser
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  Renderer2,
  setClassMetadata,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  distinctUntilChanged,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-scrollspy.mjs
var _c0 = ["mdbScrollspy", ""];
var _c1 = ["*"];
var MdbScrollspyLinkDirective = class _MdbScrollspyLinkDirective {
  cdRef;
  document;
  get scrollIntoView() {
    return this._scrollIntoView;
  }
  set scrollIntoView(value) {
    this._scrollIntoView = value;
  }
  _scrollIntoView = true;
  get section() {
    return this._section;
  }
  set section(value) {
    if (value) {
      this._section = value;
    }
  }
  _section;
  _id;
  constructor(cdRef, document) {
    this.cdRef = cdRef;
    this.document = document;
  }
  get id() {
    return this._id;
  }
  set id(newId) {
    if (newId) {
      this._id = newId;
    }
  }
  scrollspyLink = true;
  active = false;
  onClick() {
    if (this.section && this.scrollIntoView === true) {
      this.section.scrollIntoView();
    }
  }
  detectChanges() {
    this.cdRef.detectChanges();
  }
  assignSectionToId() {
    this.section = this.document.documentElement.querySelector(`#${this.id}`);
  }
  ngOnInit() {
    this.assignSectionToId();
  }
  static ɵfac = function MdbScrollspyLinkDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbScrollspyLinkDirective)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DOCUMENT));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbScrollspyLinkDirective,
    selectors: [["", "mdbScrollspyLink", ""]],
    hostVars: 4,
    hostBindings: function MdbScrollspyLinkDirective_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("click", function MdbScrollspyLinkDirective_click_HostBindingHandler() {
          return ctx.onClick();
        });
      }
      if (rf & 2) {
        ɵɵclassProp("scrollspy-link", ctx.scrollspyLink)("active", ctx.active);
      }
    },
    inputs: {
      scrollIntoView: "scrollIntoView",
      id: [0, "mdbScrollspyLink", "id"]
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbScrollspyLinkDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbScrollspyLink]"
    }]
  }], () => [{
    type: ChangeDetectorRef
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    scrollIntoView: [{
      type: Input
    }],
    id: [{
      type: Input,
      args: ["mdbScrollspyLink"]
    }],
    scrollspyLink: [{
      type: HostBinding,
      args: ["class.scrollspy-link"]
    }],
    active: [{
      type: HostBinding,
      args: ["class.active"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click", []]
    }]
  });
})();
var MdbScrollspyService = class _MdbScrollspyService {
  scrollSpys = [];
  activeSubject = new Subject();
  active$ = this.activeSubject;
  addScrollspy(scrollSpy) {
    this.scrollSpys.push(scrollSpy);
  }
  removeScrollspy(scrollSpyId) {
    const scrollSpyIndex = this.scrollSpys.findIndex((spy) => {
      return spy.id === scrollSpyId;
    });
    this.scrollSpys.splice(scrollSpyIndex, 1);
  }
  updateActiveState(scrollSpyId, activeLinkId) {
    const scrollSpy = this.scrollSpys.find((spy) => {
      return spy.id === scrollSpyId;
    });
    if (!scrollSpy) {
      return;
    }
    const activeLink = scrollSpy.links.find((link) => {
      return link.id === activeLinkId;
    });
    this.setActiveLink(activeLink);
  }
  removeActiveState(scrollSpyId, activeLinkId) {
    const scrollSpy = this.scrollSpys.find((spy) => {
      return spy.id === scrollSpyId;
    });
    if (!scrollSpy) {
      return;
    }
    const activeLink = scrollSpy.links.find((link) => {
      return link.id === activeLinkId;
    });
    if (!activeLink) {
      return;
    }
    activeLink.active = false;
    activeLink.detectChanges();
  }
  setActiveLink(activeLink) {
    if (activeLink) {
      activeLink.active = true;
      activeLink.detectChanges();
      this.activeSubject.next(activeLink);
    }
  }
  removeActiveLinks(scrollSpyId) {
    const scrollSpy = this.scrollSpys.find((spy) => {
      return spy.id === scrollSpyId;
    });
    if (!scrollSpy) {
      return;
    }
    scrollSpy.links.forEach((link) => {
      link.active = false;
      link.detectChanges();
    });
  }
  static ɵfac = function MdbScrollspyService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbScrollspyService)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MdbScrollspyService,
    factory: _MdbScrollspyService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbScrollspyService, [{
    type: Injectable
  }], null, null);
})();
var MdbScrollspyDirective = class _MdbScrollspyDirective {
  scrollSpyService;
  _elementRef;
  _renderer;
  links;
  _destroy$ = new Subject();
  get id() {
    return this._id;
  }
  set id(newId) {
    if (newId) {
      this._id = newId;
    }
  }
  _id;
  get collapsible() {
    return this._collapsible;
  }
  set collapsible(value) {
    this._collapsible = coerceBooleanProperty(value);
  }
  _collapsible = false;
  _isBrowser;
  activeLinkChange = new EventEmitter();
  activeSub;
  constructor(scrollSpyService, _elementRef, _renderer, platformId) {
    this.scrollSpyService = scrollSpyService;
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._isBrowser = isPlatformBrowser(platformId);
  }
  get host() {
    return this._elementRef.nativeElement;
  }
  collapsibleElementHeight = 0;
  ngOnInit() {
    if (this._isBrowser) {
      this.collapsibleElementHeight = this.host.getBoundingClientRect().height;
    }
    this.activeSub = this.scrollSpyService.active$.pipe(takeUntil(this._destroy$), distinctUntilChanged()).subscribe((activeLink) => {
      this.activeLinkChange.emit(activeLink);
      if (this.collapsible) {
        this.styleCollapsibleElement();
      }
    });
  }
  ngAfterContentInit() {
    this.scrollSpyService.addScrollspy({
      id: this.id,
      links: this.links
    });
  }
  ngOnDestroy() {
    this.scrollSpyService.removeScrollspy(this.id);
    this._destroy$.next();
    this._destroy$.complete();
  }
  styleCollapsibleElement() {
    this._renderer.setStyle(this.host, "overflow", "hidden");
    this._renderer.setStyle(this.host, "transition", "height 0.2s ease-in-out");
    this._renderer.setStyle(this.host, "flex-wrap", "nowrap");
    const hostSiblings = this.getAllSiblings(this.host);
    const isAnySiblingActive = hostSiblings.some((element) => {
      return element.classList.contains("active");
    });
    if (this.collapsible && isAnySiblingActive) {
      this._renderer.setStyle(this.host, "height", `${this.collapsibleElementHeight}px`);
    } else if (this.collapsible && !isAnySiblingActive) {
      this._renderer.setStyle(this.host, "height", "0px");
    }
  }
  getAllSiblings(element) {
    let siblings = [];
    if (!element.parentNode) {
      return siblings;
    }
    let sibling = element.parentNode.firstElementChild;
    do {
      if (sibling != element) {
        siblings.push(sibling);
      }
    } while (sibling = sibling.nextElementSibling);
    return siblings;
  }
  static ɵfac = function MdbScrollspyDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbScrollspyDirective)(ɵɵdirectiveInject(MdbScrollspyService), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(PLATFORM_ID));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbScrollspyDirective,
    selectors: [["", "mdbScrollspy", ""]],
    contentQueries: function MdbScrollspyDirective_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MdbScrollspyLinkDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.links = _t);
      }
    },
    inputs: {
      id: [0, "mdbScrollspy", "id"],
      collapsible: "collapsible"
    },
    outputs: {
      activeLinkChange: "activeLinkChange"
    },
    standalone: false,
    attrs: _c0,
    ngContentSelectors: _c1,
    decls: 1,
    vars: 0,
    template: function MdbScrollspyDirective_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbScrollspyDirective, [{
    type: Component,
    args: [{
      // eslint-disable-next-line @angular-eslint/component-selector
      selector: "[mdbScrollspy]",
      template: "<ng-content></ng-content>"
    }]
  }], () => [{
    type: MdbScrollspyService
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], {
    links: [{
      type: ContentChildren,
      args: [MdbScrollspyLinkDirective, {
        descendants: true
      }]
    }],
    id: [{
      type: Input,
      args: ["mdbScrollspy"]
    }],
    collapsible: [{
      type: Input
    }],
    activeLinkChange: [{
      type: Output
    }]
  });
})();
var MdbScrollspyElementDirective = class _MdbScrollspyElementDirective {
  _elementRef;
  renderer;
  ngZone;
  scrollSpyService;
  _document;
  id;
  get host() {
    return this._elementRef.nativeElement;
  }
  container;
  get scrollSpyId() {
    return this._scrollSpyId;
  }
  set scrollSpyId(newId) {
    if (newId) {
      this._scrollSpyId = newId;
    }
  }
  _scrollSpyId;
  offset = 0;
  constructor(_elementRef, renderer, ngZone, scrollSpyService, _document) {
    this._elementRef = _elementRef;
    this.renderer = renderer;
    this.ngZone = ngZone;
    this.scrollSpyService = scrollSpyService;
    this._document = _document;
  }
  isElementInViewport() {
    const scrollTop = this.container.scrollTop;
    const elTop = this.host.offsetTop - this.offset;
    const elHeight = this.host.offsetHeight;
    return scrollTop >= elTop && scrollTop < elTop + elHeight;
  }
  updateActiveState(scrollSpyId, id) {
    if (this.isElementInViewport()) {
      this.scrollSpyService.removeActiveLinks(scrollSpyId);
      this.scrollSpyService.updateActiveState(scrollSpyId, id);
    }
  }
  onScroll() {
    this.updateActiveState(this.scrollSpyId, this.id);
  }
  listenToScroll() {
    this.renderer.listen(this.container, "scroll", () => {
      this.onScroll();
    });
  }
  ngOnInit() {
    this.id = this.host.id;
    if (!this.container) {
      this.container = this._getClosestEl(this.host, ".scrollspy-container");
    }
    this.renderer.setStyle(this.container, "position", "relative");
    this.ngZone.runOutsideAngular(this.listenToScroll.bind(this));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateActiveState(this.scrollSpyId, this.id);
    }, 0);
  }
  _getClosestEl(el, selector) {
    for (; el && el !== this._document; el = el.parentNode) {
      if (el.matches && el.matches(selector)) {
        return el;
      }
    }
    return null;
  }
  static ɵfac = function MdbScrollspyElementDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbScrollspyElementDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(MdbScrollspyService), ɵɵdirectiveInject(DOCUMENT));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbScrollspyElementDirective,
    selectors: [["", "mdbScrollspyElement", ""]],
    inputs: {
      container: "container",
      scrollSpyId: [0, "mdbScrollspyElement", "scrollSpyId"],
      offset: "offset"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbScrollspyElementDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbScrollspyElement]"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }, {
    type: MdbScrollspyService
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], {
    container: [{
      type: Input
    }],
    scrollSpyId: [{
      type: Input,
      args: ["mdbScrollspyElement"]
    }],
    offset: [{
      type: Input
    }]
  });
})();
var MdbScrollspyWindowDirective = class _MdbScrollspyWindowDirective {
  document;
  el;
  renderer;
  ngZone;
  scrollSpyService;
  id;
  get scrollSpyId() {
    return this._scrollSpyId;
  }
  set scrollSpyId(newId) {
    if (newId) {
      this._scrollSpyId = newId;
    }
  }
  _scrollSpyId;
  offset = 0;
  constructor(document, el, renderer, ngZone, scrollSpyService) {
    this.document = document;
    this.el = el;
    this.renderer = renderer;
    this.ngZone = ngZone;
    this.scrollSpyService = scrollSpyService;
  }
  isElementInViewport() {
    const scrollTop = this.document.documentElement.scrollTop || this.document.body.scrollTop;
    const elHeight = this.el.nativeElement.offsetHeight;
    const elTop = this.el.nativeElement.offsetTop - this.offset;
    const elBottom = elTop + elHeight;
    return scrollTop >= elTop && scrollTop <= elBottom;
  }
  updateActiveState(scrollSpyId, id) {
    if (this.isElementInViewport()) {
      this.scrollSpyService.updateActiveState(scrollSpyId, id);
    } else {
      this.scrollSpyService.removeActiveState(scrollSpyId, id);
    }
  }
  onScroll() {
    this.updateActiveState(this.scrollSpyId, this.id);
  }
  listenToScroll() {
    this.renderer.listen(window, "scroll", () => {
      this.onScroll();
    });
  }
  ngOnInit() {
    this.id = this.el.nativeElement.id;
    this.ngZone.runOutsideAngular(this.listenToScroll.bind(this));
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.updateActiveState(this.scrollSpyId, this.id);
    }, 0);
  }
  static ɵfac = function MdbScrollspyWindowDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbScrollspyWindowDirective)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(MdbScrollspyService));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbScrollspyWindowDirective,
    selectors: [["", "mdbScrollspyWindow", ""]],
    inputs: {
      scrollSpyId: [0, "mdbScrollspyWindow", "scrollSpyId"],
      offset: "offset"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbScrollspyWindowDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbScrollspyWindow]"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: ElementRef
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }, {
    type: MdbScrollspyService
  }], {
    scrollSpyId: [{
      type: Input,
      args: ["mdbScrollspyWindow"]
    }],
    offset: [{
      type: Input
    }]
  });
})();
var MdbScrollspyModule = class _MdbScrollspyModule {
  static ɵfac = function MdbScrollspyModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbScrollspyModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbScrollspyModule,
    declarations: [MdbScrollspyDirective, MdbScrollspyLinkDirective, MdbScrollspyElementDirective, MdbScrollspyWindowDirective],
    exports: [MdbScrollspyDirective, MdbScrollspyLinkDirective, MdbScrollspyElementDirective, MdbScrollspyWindowDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [MdbScrollspyService]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbScrollspyModule, [{
    type: NgModule,
    args: [{
      declarations: [MdbScrollspyDirective, MdbScrollspyLinkDirective, MdbScrollspyElementDirective, MdbScrollspyWindowDirective],
      exports: [MdbScrollspyDirective, MdbScrollspyLinkDirective, MdbScrollspyElementDirective, MdbScrollspyWindowDirective],
      providers: [MdbScrollspyService]
    }]
  }], null, null);
})();
export {
  MdbScrollspyDirective,
  MdbScrollspyElementDirective,
  MdbScrollspyLinkDirective,
  MdbScrollspyModule,
  MdbScrollspyService,
  MdbScrollspyWindowDirective
};
//# sourceMappingURL=mdb-angular-ui-kit_scrollspy.js.map
