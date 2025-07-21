import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayPositionBuilder
} from "./chunk-BQ2MXJOV.js";
import {
  TemplatePortal
} from "./chunk-AWQ4ECAQ.js";
import "./chunk-3YLFXDIK.js";
import {
  BreakpointObserver
} from "./chunk-YPWWSUN4.js";
import "./chunk-JXYY5DIS.js";
import "./chunk-KDENNSUX.js";
import "./chunk-BDD7CDBT.js";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-4C72D2SV.js";
import "./chunk-TAMUENPF.js";
import "./chunk-3EENIVFQ.js";
import {
  CommonModule
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵviewQuery
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  filter,
  fromEvent,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-dropdown.mjs
var _c0 = ["dropdownTemplate"];
var _c1 = ["mdbDropdown", ""];
var _c2 = ["*", [["", 8, "dropdown-toggle"]], [["", 8, "dropdown-menu"]]];
var _c3 = ["*", ".dropdown-toggle", ".dropdown-menu"];
function MdbDropdownDirective_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "div");
    ɵɵlistener("@fade.done", function MdbDropdownDirective_ng_template_2_Template_div_animation_fade_done_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onAnimationEnd($event));
    });
    ɵɵprojection(1, 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    ɵɵproperty("@fade", ctx_r1._animationState)("@.disabled", !ctx_r1.animation);
  }
}
var MdbDropdownToggleDirective = class _MdbDropdownToggleDirective {
  constructor() {
  }
  static ɵfac = function MdbDropdownToggleDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbDropdownToggleDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbDropdownToggleDirective,
    selectors: [["", "mdbDropdownToggle", ""]],
    exportAs: ["mdbDropdownToggle"],
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbDropdownToggleDirective, [{
    type: Directive,
    args: [{
      selector: "[mdbDropdownToggle]",
      exportAs: "mdbDropdownToggle"
    }]
  }], () => [], null);
})();
var MdbDropdownMenuDirective = class _MdbDropdownMenuDirective {
  elementRef;
  _renderer;
  constructor(elementRef, _renderer) {
    this.elementRef = elementRef;
    this._renderer = _renderer;
  }
  menuPositionClassChanged = new EventEmitter();
  get menuPositionClass() {
    return this._menuPositionClass;
  }
  set menuPositionClass(newClass) {
    const host = this.elementRef.nativeElement;
    const isSameClass = host.classList.contains(newClass);
    if (this._menuPositionClass !== newClass && !isSameClass) {
      const menuPositionClasses = ["dropdown-menu-start", "dropdown-menu-sm-start", "dropdown-menu-md-start", "dropdown-menu-lg-start", "dropdown-menu-xl-start", "dropdown-menu-xxl-start", "dropdown-menu-xxl-start", "dropdown-menu-xxl-start", "dropdown-menu-end", "dropdown-menu-sm-end", "dropdown-menu-md-end", "dropdown-menu-lg-end", "dropdown-menu-xl-end", "dropdown-menu-xxl-end", "dropdown-menu-xxl-end", "dropdown-menu-xxl-end"];
      menuPositionClasses.forEach((className) => {
        this._renderer.removeClass(host, className);
      });
      this._renderer.addClass(host, newClass);
      this.menuPositionClassChanged.emit(this.menuPositionClass);
    }
  }
  _menuPositionClass;
  static ɵfac = function MdbDropdownMenuDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbDropdownMenuDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbDropdownMenuDirective,
    selectors: [["", "mdbDropdownMenu", ""]],
    inputs: {
      menuPositionClass: "menuPositionClass"
    },
    outputs: {
      menuPositionClassChanged: "menuPositionClassChanged"
    },
    exportAs: ["mdbDropdownMenu"],
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbDropdownMenuDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbDropdownMenu]",
      exportAs: "mdbDropdownMenu"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    menuPositionClassChanged: [{
      type: Output
    }],
    menuPositionClass: [{
      type: Input
    }]
  });
})();
var MdbDropdownDirective = class _MdbDropdownDirective {
  _overlay;
  _overlayPositionBuilder;
  _elementRef;
  _vcr;
  _breakpointObserver;
  _cdRef;
  _renderer;
  _template;
  _dropdownToggle;
  _dropdownMenu;
  animation = true;
  closeOnEsc = true;
  closeOnItemClick = true;
  closeOnOutsideClick = true;
  offset = 0;
  get positionClass() {
    return this._positionClass;
  }
  set positionClass(newClass) {
    const isSameClass = this.host.classList.contains(newClass);
    if (this._positionClass !== newClass && !isSameClass) {
      const positionClasses = ["dropdown", "dropup", "dropstart", "dropend"];
      positionClasses.forEach((className) => {
        this._renderer.removeClass(this.host, className);
      });
      this._renderer.addClass(this.host, newClass);
    }
    this._updateOverlay();
  }
  _positionClass;
  withPush = false;
  dropdownShow = new EventEmitter();
  dropdownShown = new EventEmitter();
  dropdownHide = new EventEmitter();
  dropdownHidden = new EventEmitter();
  _overlayRef;
  _portal;
  _open = false;
  _isDropUp;
  _isDropStart;
  _isDropEnd;
  _isDropdownMenuEnd;
  _xPosition;
  _breakpoints;
  _mousedownTarget = null;
  _destroy$ = new Subject();
  get host() {
    return this._elementRef.nativeElement;
  }
  _breakpointSubscription;
  _animationState = "hidden";
  constructor(_overlay, _overlayPositionBuilder, _elementRef, _vcr, _breakpointObserver, _cdRef, _renderer) {
    this._overlay = _overlay;
    this._overlayPositionBuilder = _overlayPositionBuilder;
    this._elementRef = _elementRef;
    this._vcr = _vcr;
    this._breakpointObserver = _breakpointObserver;
    this._cdRef = _cdRef;
    this._renderer = _renderer;
    this._breakpoints = {
      isSm: this._breakpointObserver.isMatched("(min-width: 576px)"),
      isMd: this._breakpointObserver.isMatched("(min-width: 768px)"),
      isLg: this._breakpointObserver.isMatched("(min-width: 992px)"),
      isXl: this._breakpointObserver.isMatched("(min-width: 1200px)"),
      isXxl: this._breakpointObserver.isMatched("(min-width: 1400px)")
    };
  }
  ngAfterContentInit() {
    this._bindDropdownToggleClick();
    this._listenToMenuPositionClassChange();
  }
  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.detach();
      this._overlayRef.dispose();
    }
    this._destroy$.next();
    this._destroy$.complete();
  }
  _bindDropdownToggleClick() {
    fromEvent(this._dropdownToggle.nativeElement, "click").pipe(takeUntil(this._destroy$)).subscribe(() => this.toggle());
  }
  _listenToMenuPositionClassChange() {
    this._dropdownMenu.menuPositionClassChanged.pipe(takeUntil(this._destroy$)).subscribe(() => this._updateOverlay());
  }
  _updateOverlay() {
    this._overlayRef?.updatePositionStrategy(this._createPositionStrategy());
  }
  _createOverlayConfig() {
    return new OverlayConfig({
      hasBackdrop: false,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy: this._createPositionStrategy()
    });
  }
  _createOverlay() {
    this._overlayRef = this._overlay.create(this._createOverlayConfig());
  }
  _createPositionStrategy() {
    const positionStrategy = this._overlayPositionBuilder.flexibleConnectedTo(this._dropdownToggle).withPositions(this._getPosition()).withFlexibleDimensions(false).withPush(this.withPush);
    return positionStrategy;
  }
  _getPosition() {
    this._isDropUp = this.host.classList.contains("dropup");
    this._isDropStart = this.host.classList.contains("dropstart");
    this._isDropEnd = this.host.classList.contains("dropend");
    this._isDropdownMenuEnd = this._dropdownMenu.elementRef.nativeElement.classList.contains("dropdown-menu-end");
    this._xPosition = this._isDropdownMenuEnd ? "end" : "start";
    const regex = new RegExp(/dropdown-menu-(sm|md|lg|xl|xxl)-(start|end)/, "g");
    const responsiveClass = this._dropdownMenu.elementRef.nativeElement.className.match(regex);
    if (responsiveClass) {
      this._subscribeBrakpoints();
      const positionRegex = new RegExp(/start|end/, "g");
      const breakpointRegex = new RegExp(/(sm|md|lg|xl|xxl)/, "g");
      const dropdownPosition = positionRegex.exec(responsiveClass)[0];
      const breakpoint = breakpointRegex.exec(responsiveClass)[0];
      switch (true) {
        case (breakpoint === "xxl" && this._breakpoints.isXxl):
          this._xPosition = dropdownPosition;
          break;
        case (breakpoint === "xl" && this._breakpoints.isXl):
          this._xPosition = dropdownPosition;
          break;
        case (breakpoint === "lg" && this._breakpoints.isLg):
          this._xPosition = dropdownPosition;
          break;
        case (breakpoint === "md" && this._breakpoints.isMd):
          this._xPosition = dropdownPosition;
          break;
        case (breakpoint === "sm" && this._breakpoints.isSm):
          this._xPosition = dropdownPosition;
          break;
        default:
          break;
      }
    }
    let position;
    const positionDropup = {
      originX: this._xPosition,
      originY: "top",
      overlayX: this._xPosition,
      overlayY: "bottom",
      offsetY: -this.offset
    };
    const positionDropdown = {
      originX: this._xPosition,
      originY: "bottom",
      overlayX: this._xPosition,
      overlayY: "top",
      offsetY: this.offset
    };
    const positionDropstart = {
      originX: "start",
      originY: "top",
      overlayX: "end",
      overlayY: "top",
      offsetX: this.offset
    };
    const positionDropend = {
      originX: "end",
      originY: "top",
      overlayX: "start",
      overlayY: "top",
      offsetX: -this.offset
    };
    switch (true) {
      case this._isDropEnd:
        position = [positionDropend, positionDropstart];
        break;
      case this._isDropStart:
        position = [positionDropstart, positionDropend];
        break;
      case this._isDropUp:
        position = [positionDropup, positionDropdown];
        break;
      default:
        position = [positionDropdown, positionDropup];
        break;
    }
    return position;
  }
  _listenToEscKeyup(overlayRef) {
    return fromEvent(document, "keyup").pipe(filter((event) => event.key === "Escape"), takeUntil(overlayRef.detachments()));
  }
  _listenToMousedown(overlayRef) {
    return fromEvent(document, "mousedown").pipe(takeUntil(overlayRef.detachments()));
  }
  _listenToClick(overlayRef, origin) {
    return fromEvent(document, "click").pipe(filter((event) => {
      const target = event.target;
      const isInsideMenu = this._dropdownMenu.elementRef.nativeElement.contains(target);
      const notTogglerIcon = !this._dropdownToggle.nativeElement.contains(target);
      const notCustomContent = !isInsideMenu || target.classList && target.classList.contains("dropdown-item");
      const notOrigin = target !== origin;
      return notOrigin && notTogglerIcon && notCustomContent;
    }), takeUntil(overlayRef.detachments()));
  }
  onAnimationEnd(event) {
    if (event.fromState === "visible" && event.toState === "hidden") {
      this._overlayRef.detach();
      this._open = false;
      this._renderer.setAttribute(this._dropdownToggle.nativeElement, "aria-expanded", "false");
      this.dropdownHidden.emit(this);
    }
    if (event.fromState === "hidden" && event.toState === "visible") {
      this.dropdownShown.emit(this);
    }
  }
  _subscribeBrakpoints() {
    const brakpoints = ["(min-width: 576px)", "(min-width: 768px)", "(min-width: 992px)", "(min-width: 1200px)", "(min-width: 1400px)"];
    this._breakpointSubscription = this._breakpointObserver.observe(brakpoints).pipe(takeUntil(this._destroy$)).subscribe((result) => {
      Object.keys(this._breakpoints).forEach((key, index) => {
        const brakpointValue = brakpoints[index];
        const newBreakpoint = result.breakpoints[brakpointValue];
        const isBreakpointChanged = newBreakpoint !== this._breakpoints[key];
        if (!isBreakpointChanged) {
          return;
        }
        this._breakpoints[key] = newBreakpoint;
        if (this._open) {
          this._updateOverlay();
        }
      });
    });
  }
  show() {
    this._cdRef.markForCheck();
    if (this._open) {
      return;
    }
    if (!this._overlayRef) {
      this._createOverlay();
    }
    this._portal = new TemplatePortal(this._template, this._vcr);
    this.dropdownShow.emit(this);
    this._open = true;
    this._renderer.setAttribute(this._dropdownToggle.nativeElement, "aria-expanded", "true");
    this._overlayRef.attach(this._portal);
    this._listenToEscKeyup(this._overlayRef).subscribe((isEsc) => {
      if (isEsc && this.closeOnEsc) {
        this.hide();
      }
    });
    this._overlayRef.keydownEvents().pipe(takeUntil(this._overlayRef.detachments())).subscribe((event) => {
      this._handleKeyboardNavigation(event);
    });
    this._listenToMousedown(this._overlayRef).subscribe((event) => {
      this._mousedownTarget = event.target;
    });
    this._listenToClick(this._overlayRef, this._dropdownToggle.nativeElement).subscribe((event) => {
      const target = event.target;
      const isDropdownItem = target.classList && target.classList.contains("dropdown-item");
      const isOnMousedownDropdownMenu = this._dropdownMenu.elementRef.nativeElement.contains(this._mousedownTarget);
      this._mousedownTarget = null;
      if (this.closeOnItemClick && isDropdownItem) {
        this.hide();
        return;
      }
      if (this.closeOnOutsideClick && !isDropdownItem && !isOnMousedownDropdownMenu) {
        this.hide();
        return;
      }
    });
    this._animationState = "visible";
  }
  _handleKeyboardNavigation(event) {
    const items = Array.from(this._dropdownMenu.elementRef.nativeElement.querySelectorAll(".dropdown-item"));
    const key = event.key;
    const activeElement = this._dropdownMenu.elementRef.nativeElement.ownerDocument.activeElement;
    if (items.length === 0) {
      return;
    }
    let index = items.indexOf(activeElement);
    switch (key) {
      case "ArrowDown":
        event.preventDefault();
        index = Math.min(index + 1, items.length - 1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (index === -1) {
          index = items.length - 1;
          break;
        }
        index = Math.max(index - 1, 0);
        break;
    }
    const nextActiveElement = items[index];
    if (nextActiveElement) {
      nextActiveElement.focus();
    }
  }
  hide() {
    this._cdRef.markForCheck();
    if (!this._open) {
      return;
    }
    this.dropdownHide.emit(this);
    this._animationState = "hidden";
  }
  toggle() {
    this._cdRef.markForCheck();
    if (this._open) {
      this.hide();
    } else {
      this.show();
    }
  }
  static ɵfac = function MdbDropdownDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbDropdownDirective)(ɵɵdirectiveInject(Overlay), ɵɵdirectiveInject(OverlayPositionBuilder), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(BreakpointObserver), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbDropdownDirective,
    selectors: [["", "mdbDropdown", ""]],
    contentQueries: function MdbDropdownDirective_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MdbDropdownToggleDirective, 5, ElementRef);
        ɵɵcontentQuery(dirIndex, MdbDropdownMenuDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._dropdownToggle = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._dropdownMenu = _t.first);
      }
    },
    viewQuery: function MdbDropdownDirective_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._template = _t.first);
      }
    },
    inputs: {
      animation: [2, "animation", "animation", booleanAttribute],
      closeOnEsc: [2, "closeOnEsc", "closeOnEsc", booleanAttribute],
      closeOnItemClick: [2, "closeOnItemClick", "closeOnItemClick", booleanAttribute],
      closeOnOutsideClick: [2, "closeOnOutsideClick", "closeOnOutsideClick", booleanAttribute],
      offset: [2, "offset", "offset", numberAttribute],
      positionClass: "positionClass",
      withPush: [2, "withPush", "withPush", booleanAttribute]
    },
    outputs: {
      dropdownShow: "dropdownShow",
      dropdownShown: "dropdownShown",
      dropdownHide: "dropdownHide",
      dropdownHidden: "dropdownHidden"
    },
    standalone: false,
    features: [ɵɵInputTransformsFeature],
    attrs: _c1,
    ngContentSelectors: _c3,
    decls: 4,
    vars: 0,
    consts: [["dropdownTemplate", ""]],
    template: function MdbDropdownDirective_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef(_c2);
        ɵɵprojection(0);
        ɵɵprojection(1, 1);
        ɵɵtemplate(2, MdbDropdownDirective_ng_template_2_Template, 2, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
      }
    },
    encapsulation: 2,
    data: {
      animation: [trigger("fade", [state("visible", style({
        opacity: 1
      })), state("hidden", style({
        opacity: 0
      })), transition("visible => hidden", animate("150ms linear")), transition("hidden => visible", [style({
        opacity: 0
      }), animate("150ms linear")])])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbDropdownDirective, [{
    type: Component,
    args: [{
      selector: "[mdbDropdown]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("fade", [state("visible", style({
        opacity: 1
      })), state("hidden", style({
        opacity: 0
      })), transition("visible => hidden", animate("150ms linear")), transition("hidden => visible", [style({
        opacity: 0
      }), animate("150ms linear")])])],
      template: '<ng-content></ng-content>\n<ng-content select=".dropdown-toggle"></ng-content>\n<ng-template #dropdownTemplate>\n  <div [@fade]="_animationState" (@fade.done)="onAnimationEnd($event)" [@.disabled]="!animation">\n    <ng-content select=".dropdown-menu"></ng-content>\n  </div>\n</ng-template>\n'
    }]
  }], () => [{
    type: Overlay
  }, {
    type: OverlayPositionBuilder
  }, {
    type: ElementRef
  }, {
    type: ViewContainerRef
  }, {
    type: BreakpointObserver
  }, {
    type: ChangeDetectorRef
  }, {
    type: Renderer2
  }], {
    _template: [{
      type: ViewChild,
      args: ["dropdownTemplate"]
    }],
    _dropdownToggle: [{
      type: ContentChild,
      args: [MdbDropdownToggleDirective, {
        read: ElementRef
      }]
    }],
    _dropdownMenu: [{
      type: ContentChild,
      args: [MdbDropdownMenuDirective]
    }],
    animation: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeOnEsc: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeOnItemClick: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    closeOnOutsideClick: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    offset: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    positionClass: [{
      type: Input
    }],
    withPush: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    dropdownShow: [{
      type: Output
    }],
    dropdownShown: [{
      type: Output
    }],
    dropdownHide: [{
      type: Output
    }],
    dropdownHidden: [{
      type: Output
    }]
  });
})();
var MdbDropdownModule = class _MdbDropdownModule {
  static ɵfac = function MdbDropdownModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbDropdownModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbDropdownModule,
    declarations: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective],
    imports: [CommonModule, OverlayModule],
    exports: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, OverlayModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbDropdownModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, OverlayModule],
      declarations: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective],
      exports: [MdbDropdownDirective, MdbDropdownToggleDirective, MdbDropdownMenuDirective]
    }]
  }], null, null);
})();
export {
  MdbDropdownDirective,
  MdbDropdownMenuDirective,
  MdbDropdownModule,
  MdbDropdownToggleDirective
};
//# sourceMappingURL=mdb-angular-ui-kit_dropdown.js.map
