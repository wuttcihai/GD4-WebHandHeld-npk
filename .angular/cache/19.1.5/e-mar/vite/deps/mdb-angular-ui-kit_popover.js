import {
  Overlay,
  OverlayConfig,
  OverlayModule,
  OverlayPositionBuilder
} from "./chunk-BQ2MXJOV.js";
import {
  ComponentPortal
} from "./chunk-AWQ4ECAQ.js";
import "./chunk-3YLFXDIK.js";
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
  CommonModule,
  NgIf,
  NgTemplateOutlet
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  TemplateRef,
  booleanAttribute,
  numberAttribute,
  setClassMetadata,
  ɵɵInputTransformsFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  first,
  fromEvent,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-popover.mjs
function MdbPopoverComponent_h3_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "h3", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.title, " ");
  }
}
function MdbPopoverComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵelementContainer(1, 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.content)("ngTemplateOutletContext", ctx_r0.context);
  }
}
function MdbPopoverComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 4);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r0.content, " ");
  }
}
var MdbPopoverComponent = class _MdbPopoverComponent {
  _cdRef;
  animation;
  content;
  context;
  title;
  get isContentTemplate() {
    return this.content instanceof TemplateRef;
  }
  _hidden = new Subject();
  animationState = "hidden";
  constructor(_cdRef) {
    this._cdRef = _cdRef;
  }
  markForCheck() {
    this._cdRef.markForCheck();
  }
  onAnimationEnd(event) {
    if (event.toState === "hidden") {
      this._hidden.next();
    }
  }
  static ɵfac = function MdbPopoverComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbPopoverComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbPopoverComponent,
    selectors: [["mdb-popover"]],
    inputs: {
      animation: [2, "animation", "animation", booleanAttribute],
      content: "content",
      context: "context",
      title: "title"
    },
    standalone: false,
    features: [ɵɵInputTransformsFeature],
    decls: 4,
    vars: 5,
    consts: [[1, "popover"], ["class", "popover-header", 4, "ngIf"], ["class", "popover-body", 4, "ngIf"], [1, "popover-header"], [1, "popover-body"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"]],
    template: function MdbPopoverComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0);
        ɵɵlistener("@fade.done", function MdbPopoverComponent_Template_div_animation_fade_done_0_listener($event) {
          return ctx.onAnimationEnd($event);
        });
        ɵɵtemplate(1, MdbPopoverComponent_h3_1_Template, 2, 1, "h3", 1)(2, MdbPopoverComponent_div_2_Template, 2, 2, "div", 2)(3, MdbPopoverComponent_div_3_Template, 2, 1, "div", 2);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵproperty("@fade", ctx.animationState)("@.disabled", !ctx.animation);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.title);
        ɵɵadvance();
        ɵɵproperty("ngIf", ctx.isContentTemplate);
        ɵɵadvance();
        ɵɵproperty("ngIf", !ctx.isContentTemplate);
      }
    },
    dependencies: [NgIf, NgTemplateOutlet],
    encapsulation: 2,
    data: {
      animation: [trigger("fade", [state("visible", style({
        opacity: 1
      })), state("hidden", style({
        opacity: 0
      })), transition("visible <=> hidden", animate("150ms linear")), transition(":enter", animate("150ms linear"))])]
    },
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbPopoverComponent, [{
    type: Component,
    args: [{
      selector: "mdb-popover",
      changeDetection: ChangeDetectionStrategy.OnPush,
      animations: [trigger("fade", [state("visible", style({
        opacity: 1
      })), state("hidden", style({
        opacity: 0
      })), transition("visible <=> hidden", animate("150ms linear")), transition(":enter", animate("150ms linear"))])],
      template: '<div\n  class="popover"\n  [@fade]="animationState"\n  (@fade.done)="onAnimationEnd($event)"\n  [@.disabled]="!animation"\n>\n  <h3 *ngIf="title" class="popover-header">\n    {{ title }}\n  </h3>\n  <div *ngIf="isContentTemplate" class="popover-body">\n    <ng-container\n      [ngTemplateOutlet]="$any(content)"\n      [ngTemplateOutletContext]="context"\n    ></ng-container>\n  </div>\n  <div *ngIf="!isContentTemplate" class="popover-body">\n    {{ content }}\n  </div>\n</div>\n'
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    animation: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    content: [{
      type: Input
    }],
    context: [{
      type: Input
    }],
    title: [{
      type: Input
    }]
  });
})();
var MdbPopoverDirective = class _MdbPopoverDirective {
  _overlay;
  _overlayPositionBuilder;
  _elementRef;
  animation = true;
  delayHide = 0;
  delayShow = 0;
  mdbPopover = "";
  mdbPopoverData;
  mdbPopoverTitle = "";
  offset = 4;
  placement = "top";
  popoverDisabled = false;
  trigger = "click";
  popoverShow = new EventEmitter();
  popoverShown = new EventEmitter();
  popoverHide = new EventEmitter();
  popoverHidden = new EventEmitter();
  _overlayRef;
  _tooltipRef;
  _open = false;
  _showTimeout = 0;
  _hideTimeout = 0;
  _destroy$ = new Subject();
  constructor(_overlay, _overlayPositionBuilder, _elementRef) {
    this._overlay = _overlay;
    this._overlayPositionBuilder = _overlayPositionBuilder;
    this._elementRef = _elementRef;
  }
  ngOnInit() {
    if (this.popoverDisabled || this.mdbPopover === "" && this.mdbPopoverTitle === "") {
      return;
    }
    this._bindTriggerEvents();
  }
  ngOnDestroy() {
    if (this._open) {
      this.hide();
    }
    this._destroy$.next();
    this._destroy$.complete();
  }
  _bindTriggerEvents() {
    const triggers = this.trigger.split(" ");
    triggers.forEach((trigger2) => {
      if (trigger2 === "click") {
        fromEvent(this._elementRef.nativeElement, trigger2).pipe(takeUntil(this._destroy$)).subscribe(() => this.toggle());
      } else if (trigger2 !== "manual") {
        const evIn = trigger2 === "hover" ? "mouseenter" : "focusin";
        const evOut = trigger2 === "hover" ? "mouseleave" : "focusout";
        fromEvent(this._elementRef.nativeElement, evIn).pipe(takeUntil(this._destroy$)).subscribe(() => this.show());
        fromEvent(this._elementRef.nativeElement, evOut).pipe(takeUntil(this._destroy$)).subscribe(() => this.hide());
      }
    });
  }
  _createOverlayConfig() {
    const positionStrategy = this._overlayPositionBuilder.flexibleConnectedTo(this._elementRef).withPositions(this._getPosition()).withPush(false);
    const overlayConfig = new OverlayConfig({
      hasBackdrop: false,
      scrollStrategy: this._overlay.scrollStrategies.reposition(),
      positionStrategy
    });
    return overlayConfig;
  }
  _createOverlay() {
    this._overlayRef = this._overlay.create(this._createOverlayConfig());
  }
  _getPosition() {
    let position;
    const positionTop = {
      originX: "center",
      originY: "top",
      overlayX: "center",
      overlayY: "bottom",
      offsetY: -this.offset
    };
    const positionBottom = {
      originX: "center",
      originY: "bottom",
      overlayX: "center",
      overlayY: "top",
      offsetY: this.offset
    };
    const positionRight = {
      originX: "end",
      originY: "center",
      overlayX: "start",
      overlayY: "center",
      offsetX: this.offset
    };
    const positionLeft = {
      originX: "start",
      originY: "center",
      overlayX: "end",
      overlayY: "center",
      offsetX: -this.offset
    };
    switch (this.placement) {
      case "top":
        position = [positionTop, positionBottom];
        break;
      case "bottom":
        position = [positionBottom, positionTop];
        break;
      case "left":
        position = [positionLeft, positionRight, positionTop, positionBottom];
        break;
      case "right":
        position = [positionRight, positionLeft, positionTop, positionBottom];
        break;
      default:
        break;
    }
    return position;
  }
  show() {
    if (this._hideTimeout) {
      this._overlayRef.detach();
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    this._createOverlay();
    if (this._hideTimeout) {
      clearTimeout(this._hideTimeout);
      this._hideTimeout = null;
    }
    this._showTimeout = setTimeout(() => {
      const tooltipPortal = new ComponentPortal(MdbPopoverComponent);
      this.popoverShow.emit(this);
      this._open = true;
      this._tooltipRef = this._overlayRef.attach(tooltipPortal);
      this._tooltipRef.instance.content = this.mdbPopover;
      this._tooltipRef.instance.title = this.mdbPopoverTitle;
      this._tooltipRef.instance.animation = this.animation;
      this._tooltipRef.instance.context = this.mdbPopoverData;
      this._tooltipRef.instance.animationState = "visible";
      this._tooltipRef.instance.markForCheck();
      this.popoverShown.emit(this);
    }, this.delayShow);
  }
  hide() {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = null;
    } else {
      return;
    }
    this._hideTimeout = setTimeout(() => {
      this.popoverHide.emit(this);
      if (!this._tooltipRef) {
        this._overlayRef.detach();
        this._open = false;
        this.popoverHidden.emit(this);
      } else {
        this._tooltipRef.instance._hidden.pipe(first()).subscribe(() => {
          this._overlayRef.detach();
          this._open = false;
          this.popoverHidden.emit(this);
        });
        this._tooltipRef.instance.animationState = "hidden";
        this._tooltipRef.instance.markForCheck();
      }
    }, this.delayHide);
  }
  toggle() {
    if (this._open) {
      this.hide();
    } else {
      this.show();
    }
  }
  static ɵfac = function MdbPopoverDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbPopoverDirective)(ɵɵdirectiveInject(Overlay), ɵɵdirectiveInject(OverlayPositionBuilder), ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbPopoverDirective,
    selectors: [["", "mdbPopover", ""]],
    inputs: {
      animation: [2, "animation", "animation", booleanAttribute],
      delayHide: [2, "delayHide", "delayHide", numberAttribute],
      delayShow: [2, "delayShow", "delayShow", numberAttribute],
      mdbPopover: "mdbPopover",
      mdbPopoverData: "mdbPopoverData",
      mdbPopoverTitle: "mdbPopoverTitle",
      offset: [2, "offset", "offset", numberAttribute],
      placement: "placement",
      popoverDisabled: [2, "popoverDisabled", "popoverDisabled", booleanAttribute],
      trigger: "trigger"
    },
    outputs: {
      popoverShow: "popoverShow",
      popoverShown: "popoverShown",
      popoverHide: "popoverHide",
      popoverHidden: "popoverHidden"
    },
    exportAs: ["mdbPopover"],
    standalone: false,
    features: [ɵɵInputTransformsFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbPopoverDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbPopover]",
      exportAs: "mdbPopover"
    }]
  }], () => [{
    type: Overlay
  }, {
    type: OverlayPositionBuilder
  }, {
    type: ElementRef
  }], {
    animation: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    delayHide: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    delayShow: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    mdbPopover: [{
      type: Input
    }],
    mdbPopoverData: [{
      type: Input
    }],
    mdbPopoverTitle: [{
      type: Input
    }],
    offset: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    placement: [{
      type: Input
    }],
    popoverDisabled: [{
      type: Input,
      args: [{
        transform: booleanAttribute
      }]
    }],
    trigger: [{
      type: Input
    }],
    popoverShow: [{
      type: Output
    }],
    popoverShown: [{
      type: Output
    }],
    popoverHide: [{
      type: Output
    }],
    popoverHidden: [{
      type: Output
    }]
  });
})();
var MdbPopoverModule = class _MdbPopoverModule {
  static ɵfac = function MdbPopoverModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbPopoverModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbPopoverModule,
    declarations: [MdbPopoverDirective, MdbPopoverComponent],
    imports: [CommonModule, OverlayModule],
    exports: [MdbPopoverDirective, MdbPopoverComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, OverlayModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbPopoverModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, OverlayModule],
      declarations: [MdbPopoverDirective, MdbPopoverComponent],
      exports: [MdbPopoverDirective, MdbPopoverComponent]
    }]
  }], null, null);
})();
export {
  MdbPopoverComponent,
  MdbPopoverDirective,
  MdbPopoverModule
};
//# sourceMappingURL=mdb-angular-ui-kit_popover.js.map
