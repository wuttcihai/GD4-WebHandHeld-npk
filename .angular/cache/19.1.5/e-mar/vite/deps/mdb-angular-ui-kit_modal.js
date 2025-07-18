import {
  Overlay,
  OverlayConfig,
  OverlayModule
} from "./chunk-BQ2MXJOV.js";
import {
  CdkPortalOutlet,
  ComponentPortal,
  PortalModule,
  TemplatePortal
} from "./chunk-AWQ4ECAQ.js";
import {
  ConfigurableFocusTrapFactory
} from "./chunk-KTMFHKGD.js";
import "./chunk-3PTJVQHL.js";
import "./chunk-3YLFXDIK.js";
import "./chunk-YPWWSUN4.js";
import "./chunk-JXYY5DIS.js";
import "./chunk-KDENNSUX.js";
import "./chunk-BDD7CDBT.js";
import "./chunk-TAMUENPF.js";
import "./chunk-3EENIVFQ.js";
import {
  CommonModule,
  DOCUMENT,
  NgClass
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver$1,
  ElementRef,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  Injector,
  NgModule,
  NgZone,
  Renderer2,
  TemplateRef,
  ViewChild,
  setClassMetadata,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresolveWindow,
  ɵɵtemplate,
  ɵɵviewQuery
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  filter,
  fromEvent,
  take,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import {
  __spreadValues
} from "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-modal.mjs
var _c0 = ["dialog"];
var _c1 = ["content"];
var _c2 = (a0) => ({
  "rounded-0": a0
});
function MdbModalContainerComponent_ng_template_4_Template(rf, ctx) {
}
var MdbModalConfig = class {
  animation = true;
  backdrop = true;
  ignoreBackdropClick = false;
  keyboard = true;
  modalClass = "";
  containerClass = "";
  viewContainerRef;
  data = null;
  nonInvasive = false;
  focusElementSelector = "";
};
var MdbModalRef = class {
  _overlayRef;
  _container;
  constructor(_overlayRef, _container) {
    this._overlayRef = _overlayRef;
    this._container = _container;
  }
  component;
  onClose$ = new Subject();
  onClose = this.onClose$.asObservable();
  close(message) {
    this._container._close();
    setTimeout(() => {
      if (this._container._config.nonInvasive) {
        this._container._onNonInvasiveModalHidden();
      }
      this._container._restoreScrollbar();
      this.onClose$.next(message);
      this.onClose$.complete();
      this._overlayRef.detach();
      this._overlayRef.dispose();
    }, this._container.MODAL_TRANSITION);
  }
};
var MODAL_CSS_BREAKPOINT = 992;
var MODAL_OPEN_CLASS = "modal-open";
var NON_INVASIVE_CLASS = "modal-non-invasive-open";
var NON_INVASIVE_SHOW_CLASS = "modal-non-invasive-show";
var MdbModalContainerComponent = class _MdbModalContainerComponent {
  _document;
  _elementRef;
  _renderer;
  _focusTrapFactory;
  _ngZone;
  _portalOutlet;
  modalDialog;
  modalContent;
  _destroy$ = new Subject();
  backdropClick$ = new Subject();
  _config;
  BACKDROP_TRANSITION = 150;
  MODAL_TRANSITION = 200;
  NON_INVASIVE_TRANSITION = 450;
  _previouslyFocusedElement;
  _focusTrap;
  modal = true;
  get hasAnimation() {
    return this._config.animation;
  }
  onWindowResize() {
    this._ngZone.runOutsideAngular(() => {
      if (this._config.nonInvasive) {
        this._handleWindowResize();
      }
    });
  }
  get host() {
    return this._elementRef.nativeElement;
  }
  _isScrollable = false;
  _isBottomRight = false;
  _isBottomLeft = false;
  _isTopRight = false;
  _isTopLeft = false;
  _isSideTopModal = false;
  _isSideBottomModal = false;
  _isSideModal = false;
  _isModalBottom = false;
  _modalContentRect;
  _modalContentComputedStyles;
  _modalDialogComputedStyles;
  _topOffset = 0;
  _leftOffset = 0;
  _rightOffset = 0;
  _bottomOffset = 0;
  constructor(_document, _elementRef, _renderer, _focusTrapFactory, _ngZone) {
    this._document = _document;
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._focusTrapFactory = _focusTrapFactory;
    this._ngZone = _ngZone;
  }
  ngOnInit() {
    this._updateContainerClass();
    this._renderer.setStyle(this.host, "display", "block");
    if (!this._config.nonInvasive) {
      this._focusTrap = this._focusTrapFactory.create(this.host);
      this._previouslyFocusedElement = this._document.activeElement;
    }
    const focusElement = this._config.focusElementSelector && this.modalContent.nativeElement.querySelector(this._config.focusElementSelector);
    if (this._config.animation) {
      setTimeout(() => {
        this._renderer.addClass(this.host, "show");
        if (focusElement) {
          setTimeout(() => {
            focusElement.focus();
          }, this.MODAL_TRANSITION);
        } else {
          setTimeout(() => {
            this._focusTrap?.focusInitialElementWhenReady();
          }, this.MODAL_TRANSITION);
        }
      }, this.BACKDROP_TRANSITION);
    } else if (focusElement) {
      focusElement.focus();
    } else {
      this._focusTrap?.focusInitialElementWhenReady();
    }
  }
  ngAfterViewInit() {
    const widthWithVerticalScroll = this._document.body.offsetWidth;
    this._renderer.addClass(this._document.body, MODAL_OPEN_CLASS);
    if (this._config.nonInvasive) {
      this._renderer.addClass(this._document.body, NON_INVASIVE_CLASS);
      setTimeout(() => {
        this._onNonInvasiveModalShown();
      }, this.NON_INVASIVE_TRANSITION);
    }
    if (!this._config.nonInvasive) {
      this._renderer.setStyle(this._document.body, "overflow", "hidden");
    }
    const widthWithoutVerticalScroll = this._document.body.offsetWidth;
    if (!this._config.nonInvasive) {
      this._renderer.setStyle(this._document.body, "padding-right", `${widthWithoutVerticalScroll - widthWithVerticalScroll}px`);
    }
    if (!this._config.ignoreBackdropClick && !this._config.nonInvasive) {
      fromEvent(this.host, "mousedown").pipe(filter((event) => {
        const target = event.target;
        const dialog = this.modalDialog.nativeElement;
        const notDialog = target !== dialog;
        const notDialogContent = !dialog.contains(target);
        return notDialog && notDialogContent;
      }), takeUntil(this._destroy$)).subscribe((event) => {
        this.backdropClick$.next(event);
      });
    }
  }
  ngOnDestroy() {
    this._previouslyFocusedElement?.focus();
    this._focusTrap?.destroy();
    this._destroy$.next();
    this._destroy$.complete();
  }
  _updateContainerClass() {
    if (this._config.containerClass === "" || this._config.containerClass.length && this._config.containerClass.length === 0) {
      return;
    }
    const containerClasses = this._config.containerClass.split(" ");
    containerClasses.forEach((containerClass) => {
      this._renderer.addClass(this.host, containerClass);
    });
  }
  _onNonInvasiveModalShown() {
    this._isScrollable = this._config.modalClass.includes("modal-dialog-scrollable");
    this._isBottomRight = this._config.modalClass.includes("modal-bottom-right");
    this._isBottomLeft = this._config.modalClass.includes("modal-bottom-left");
    this._isTopRight = this._config.modalClass.includes("modal-top-right");
    this._isTopLeft = this._config.modalClass.includes("modal-top-left");
    this._isModalBottom = this._config.modalClass.includes("modal-bottom");
    this._isSideTopModal = this._isTopLeft || this._isTopRight;
    this._isSideBottomModal = this._isBottomLeft || this._isBottomRight;
    this._isSideModal = this._isSideTopModal || this._isSideBottomModal;
    this._modalContentRect = this.modalContent.nativeElement.getBoundingClientRect();
    this._modalContentComputedStyles = window.getComputedStyle(this.modalContent.nativeElement);
    this._modalDialogComputedStyles = window.getComputedStyle(this.modalDialog.nativeElement);
    this._topOffset = parseInt(this._modalDialogComputedStyles.top, 0);
    this._leftOffset = parseInt(this._modalDialogComputedStyles.left, 0);
    this._rightOffset = parseInt(this._modalDialogComputedStyles.right, 0);
    this._bottomOffset = parseInt(this._modalDialogComputedStyles.bottom, 0);
    this._renderer.addClass(this.host, NON_INVASIVE_SHOW_CLASS);
    this._setNonInvasiveStyles();
  }
  _setNonInvasiveStyles(leftOffset = 0, topOffset = 0) {
    const isAboveBreakpoint = window.innerWidth >= MODAL_CSS_BREAKPOINT;
    this._renderer.setStyle(this.host, "left", `${this._modalContentRect.left + leftOffset}px`);
    this._renderer.setStyle(this.host, "width", this._modalContentComputedStyles.width);
    if (!this._isScrollable) {
      this._renderer.setStyle(this.host, "height", this._modalContentComputedStyles.height);
      this._renderer.setStyle(this.host, "display", "");
    }
    if (isAboveBreakpoint) {
      if (this._isSideBottomModal || this._isModalBottom) {
        this._renderer.setStyle(this.host, "top", `${this._modalContentRect.top + topOffset}px`);
      }
      if (this._isSideModal) {
        this._renderer.setStyle(this.host, "overflowX", "auto");
      }
    }
    if (!isAboveBreakpoint) {
      this.host.style.height = "";
    }
  }
  _onNonInvasiveModalHidden() {
    this._renderer.removeClass(this.host, NON_INVASIVE_SHOW_CLASS);
    this._resetNonInvasiveStyles();
    this._removeNonInvasiveClass();
  }
  _resetNonInvasiveStyles() {
    this._renderer.setStyle(this.host, "left", "");
    this._renderer.setStyle(this.host, "top", "");
    this._renderer.setStyle(this.host, "height", "");
    this._renderer.setStyle(this.host, "width", "");
    if (!this._isScrollable) {
      this._renderer.setStyle(this.host, "display", "");
    }
    if (this._isSideModal) {
      this._renderer.setStyle(this.host, "overflowX", "");
    }
  }
  _removeNonInvasiveClass() {
    const isOtherModalOpen = this._document.body.querySelector(".modal.show.modal-non-invasive-show");
    if (!isOtherModalOpen) {
      this._renderer.removeClass(this._document.body, NON_INVASIVE_CLASS);
    } else {
      this._renderer.addClass(this._document.body, MODAL_OPEN_CLASS);
    }
  }
  _handleWindowResize() {
    const modalContent = this.host.querySelector(".modal-content");
    this._resetNonInvasiveStyles();
    this._modalContentRect = modalContent.getBoundingClientRect();
    this._modalContentComputedStyles = window.getComputedStyle(modalContent);
    if (this._isSideTopModal || this._isSideBottomModal) {
      let sideOffset = 0;
      let topOffset = 0;
      if (this._isBottomRight || this._isBottomLeft) {
        topOffset = -this._bottomOffset;
      }
      if (this._isBottomRight || this._isTopRight) {
        sideOffset = -this._rightOffset;
      }
      if (this._isBottomLeft || this._isTopLeft) {
        sideOffset = this._leftOffset;
      }
      this._setNonInvasiveStyles(sideOffset, topOffset);
    } else {
      this._setNonInvasiveStyles();
    }
  }
  _close() {
    if (this._config.animation) {
      this._renderer.removeClass(this.host, "show");
    }
    const iframeElements = Array.from(this.host.querySelectorAll("iframe"));
    const videoElements = Array.from(this.host.querySelectorAll("video"));
    iframeElements.forEach((iframe) => {
      const srcAttribute = iframe.getAttribute("src");
      this._renderer.setAttribute(iframe, "src", srcAttribute);
    });
    videoElements.forEach((video) => {
      video.pause();
    });
  }
  _restoreScrollbar() {
    this._renderer.removeClass(this._document.body, MODAL_OPEN_CLASS);
    this._renderer.removeStyle(this._document.body, "overflow");
    this._renderer.removeStyle(this._document.body, "padding-right");
  }
  attachComponentPortal(portal) {
    return this._portalOutlet.attachComponentPortal(portal);
  }
  attachTemplatePortal(portal) {
    return this._portalOutlet.attachTemplatePortal(portal);
  }
  static ɵfac = function MdbModalContainerComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbModalContainerComponent)(ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ConfigurableFocusTrapFactory), ɵɵdirectiveInject(NgZone));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbModalContainerComponent,
    selectors: [["mdb-modal-container"]],
    viewQuery: function MdbModalContainerComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(CdkPortalOutlet, 7);
        ɵɵviewQuery(_c0, 7);
        ɵɵviewQuery(_c1, 7);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._portalOutlet = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.modalDialog = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.modalContent = _t.first);
      }
    },
    hostVars: 4,
    hostBindings: function MdbModalContainerComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("resize", function MdbModalContainerComponent_resize_HostBindingHandler($event) {
          return ctx.onWindowResize($event);
        }, false, ɵɵresolveWindow);
      }
      if (rf & 2) {
        ɵɵclassProp("modal", ctx.modal)("fade", ctx.hasAnimation);
      }
    },
    standalone: false,
    decls: 5,
    vars: 5,
    consts: [["dialog", ""], ["content", ""], [1, "modal-content", 3, "ngClass"], ["cdkPortalOutlet", ""]],
    template: function MdbModalContainerComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", null, 0)(2, "div", 2, 1);
        ɵɵtemplate(4, MdbModalContainerComponent_ng_template_4_Template, 0, 0, "ng-template", 3);
        ɵɵelementEnd()();
      }
      if (rf & 2) {
        ɵɵclassMap("modal-dialog" + (ctx._config.modalClass ? " " + ctx._config.modalClass : ""));
        ɵɵadvance(2);
        ɵɵproperty("ngClass", ɵɵpureFunction1(3, _c2, ctx._config.modalClass.includes("modal-frame")));
      }
    },
    dependencies: [NgClass, CdkPortalOutlet],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbModalContainerComponent, [{
    type: Component,
    args: [{
      selector: "mdb-modal-container",
      changeDetection: ChangeDetectionStrategy.Default,
      template: `<div #dialog [class]="'modal-dialog' + (_config.modalClass ? ' ' + _config.modalClass : '')">
  <div
    #content
    class="modal-content"
    [ngClass]="{ 'rounded-0': _config.modalClass.includes('modal-frame') }"
  >
    <ng-template cdkPortalOutlet></ng-template>
  </div>
</div>
`
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
    type: ConfigurableFocusTrapFactory
  }, {
    type: NgZone
  }], {
    _portalOutlet: [{
      type: ViewChild,
      args: [CdkPortalOutlet, {
        static: true
      }]
    }],
    modalDialog: [{
      type: ViewChild,
      args: ["dialog", {
        static: true
      }]
    }],
    modalContent: [{
      type: ViewChild,
      args: ["content", {
        static: true
      }]
    }],
    modal: [{
      type: HostBinding,
      args: ["class.modal"]
    }],
    hasAnimation: [{
      type: HostBinding,
      args: ["class.fade"]
    }],
    onWindowResize: [{
      type: HostListener,
      args: ["window:resize", ["$event"]]
    }]
  });
})();
var MdbModalService = class _MdbModalService {
  _document;
  _overlay;
  _injector;
  _cfr;
  constructor(_document, _overlay, _injector, _cfr) {
    this._document = _document;
    this._overlay = _overlay;
    this._injector = _injector;
    this._cfr = _cfr;
  }
  open(componentOrTemplateRef, config) {
    const defaultConfig = new MdbModalConfig();
    config = config ? Object.assign(defaultConfig, config) : defaultConfig;
    const overlayRef = this._createOverlay(config);
    const container = this._createContainer(overlayRef, config);
    const modalRef = this._createContent(componentOrTemplateRef, container, overlayRef, config);
    this._registerListeners(modalRef, config, container);
    return modalRef;
  }
  _createOverlay(config) {
    const overlayConfig = this._getOverlayConfig(config);
    return this._overlay.create(overlayConfig);
  }
  _getOverlayConfig(modalConfig) {
    const config = new OverlayConfig({
      positionStrategy: this._overlay.position().global(),
      scrollStrategy: this._overlay.scrollStrategies.noop(),
      hasBackdrop: modalConfig.nonInvasive ? false : modalConfig.backdrop,
      backdropClass: "mdb-backdrop"
    });
    return config;
  }
  _createContainer(overlayRef, config) {
    const portal = new ComponentPortal(MdbModalContainerComponent, null, this._injector, this._cfr);
    const containerRef = overlayRef.attach(portal);
    containerRef.instance._config = config;
    return containerRef.instance;
  }
  _createContent(componentOrTemplate, container, overlayRef, config) {
    const modalRef = new MdbModalRef(overlayRef, container);
    if (componentOrTemplate instanceof TemplateRef) {
      container.attachTemplatePortal(new TemplatePortal(componentOrTemplate, null, {
        $implicit: config.data,
        modalRef
      }));
    } else {
      const injector = this._createInjector(config, modalRef, container);
      const contentRef = container.attachComponentPortal(new ComponentPortal(componentOrTemplate, config.viewContainerRef, injector));
      if (config.data) {
        Object.assign(contentRef.instance, __spreadValues({}, config.data));
      }
      modalRef.component = contentRef.instance;
    }
    return modalRef;
  }
  _createInjector(config, modalRef, container) {
    const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    const providers = [{
      provide: MdbModalContainerComponent,
      useValue: container
    }, {
      provide: MdbModalRef,
      useValue: modalRef
    }];
    return Injector.create({
      parent: userInjector || this._injector,
      providers
    });
  }
  _registerListeners(modalRef, config, container) {
    container.backdropClick$.pipe(take(1)).subscribe(() => {
      modalRef.close();
    });
    if (config.keyboard) {
      fromEvent(container._elementRef.nativeElement, "keydown").pipe(filter((event) => {
        return event.key === "Escape";
      }), take(1)).subscribe(() => {
        modalRef.close();
      });
    }
  }
  static ɵfac = function MdbModalService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbModalService)(ɵɵinject(DOCUMENT), ɵɵinject(Overlay), ɵɵinject(Injector), ɵɵinject(ComponentFactoryResolver$1));
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _MdbModalService,
    factory: _MdbModalService.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbModalService, [{
    type: Injectable
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: Overlay
  }, {
    type: Injector
  }, {
    type: ComponentFactoryResolver$1
  }], null);
})();
var MdbModalModule = class _MdbModalModule {
  static ɵfac = function MdbModalModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbModalModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbModalModule,
    declarations: [MdbModalContainerComponent],
    imports: [CommonModule, OverlayModule, PortalModule],
    exports: [MdbModalContainerComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [MdbModalService],
    imports: [CommonModule, OverlayModule, PortalModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbModalModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, OverlayModule, PortalModule],
      exports: [MdbModalContainerComponent],
      declarations: [MdbModalContainerComponent],
      providers: [MdbModalService]
    }]
  }], null, null);
})();
export {
  MdbModalConfig,
  MdbModalContainerComponent,
  MdbModalModule,
  MdbModalRef,
  MdbModalService
};
//# sourceMappingURL=mdb-angular-ui-kit_modal.js.map
