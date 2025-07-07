import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-RBKNLYNS.js";
import {
  coerceBooleanProperty
} from "./chunk-3EENIVFQ.js";
import {
  CommonModule,
  NgClass,
  NgStyle
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  NgModule,
  Output,
  ViewChild,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-UOGU5TIC.js";
import "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-range.mjs
var _c0 = ["input"];
var _c1 = ["thumb"];
var _c2 = ["thumbValue"];
var _c3 = (a0) => ({
  "thumb-active": a0
});
var RANGE_VALUE_ACCESOR = {
  provide: NG_VALUE_ACCESSOR,
  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
  useExisting: forwardRef(() => MdbRangeComponent),
  multi: true
};
var MdbRangeComponent = class _MdbRangeComponent {
  _cdRef;
  input;
  thumb;
  thumbValue;
  id;
  required;
  name;
  value;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled;
  label;
  min = 0;
  max = 100;
  step;
  get default() {
    return this._default;
  }
  set default(value) {
    this._default = value;
  }
  _default;
  defaultRangeCounterClass;
  rangeValueChange = new EventEmitter();
  visibility = false;
  thumbStyle;
  onchange(event) {
    this.onChange(event.target.value);
  }
  onInput() {
    this.rangeValueChange.emit({
      value: this.value
    });
    this.focusRangeInput();
  }
  constructor(_cdRef) {
    this._cdRef = _cdRef;
  }
  ngAfterViewInit() {
    this.thumbPositionUpdate();
    this._cdRef.detectChanges();
  }
  focusRangeInput() {
    this.input.nativeElement.focus();
    this.visibility = true;
  }
  blurRangeInput() {
    this.input.nativeElement.blur();
    this.visibility = false;
  }
  thumbPositionUpdate() {
    const rangeInput = this.input.nativeElement;
    const inputValue = rangeInput.value;
    const minValue = rangeInput.min ? rangeInput.min : 0;
    const maxValue = rangeInput.max ? rangeInput.max : 100;
    const newValue = Number((inputValue - minValue) * 100 / (maxValue - minValue));
    this.value = inputValue;
    this.thumbStyle = {
      left: `calc(${newValue}% + (${8 - newValue * 0.15}px))`
    };
  }
  // Control Value Accessor Methods
  onChange = (_) => {
  };
  onTouched = () => {
  };
  writeValue(value) {
    this.value = value;
    this._cdRef.markForCheck();
    setTimeout(() => {
      this.thumbPositionUpdate();
    }, 0);
  }
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
  }
  static ngAcceptInputType_default;
  static ngAcceptInputType_disabled;
  static ɵfac = function MdbRangeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbRangeComponent)(ɵɵdirectiveInject(ChangeDetectorRef));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbRangeComponent,
    selectors: [["mdb-range"]],
    viewQuery: function MdbRangeComponent_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuery(_c0, 5);
        ɵɵviewQuery(_c1, 5);
        ɵɵviewQuery(_c2, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.input = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.thumb = _t.first);
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.thumbValue = _t.first);
      }
    },
    hostBindings: function MdbRangeComponent_HostBindings(rf, ctx) {
      if (rf & 1) {
        ɵɵlistener("change", function MdbRangeComponent_change_HostBindingHandler($event) {
          return ctx.onchange($event);
        })("input", function MdbRangeComponent_input_HostBindingHandler() {
          return ctx.onInput();
        });
      }
    },
    inputs: {
      id: "id",
      required: "required",
      name: "name",
      value: "value",
      disabled: "disabled",
      label: "label",
      min: "min",
      max: "max",
      step: "step",
      default: "default",
      defaultRangeCounterClass: "defaultRangeCounterClass"
    },
    outputs: {
      rangeValueChange: "rangeValueChange"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([RANGE_VALUE_ACCESOR])],
    decls: 10,
    vars: 14,
    consts: [["input", ""], ["thumb", ""], ["thumbValue", ""], ["for", "id", 1, "form-label"], [1, "range"], ["type", "range", "min", "0", "max", "5", 1, "form-range", 3, "input", "blur", "mousedown", "mouseup", "touchstart", "touchend", "name", "disabled", "id", "min", "max", "step", "value"], [1, "thumb", 3, "ngStyle", "ngClass"], [1, "thumb-value"]],
    template: function MdbRangeComponent_Template(rf, ctx) {
      if (rf & 1) {
        const _r1 = ɵɵgetCurrentView();
        ɵɵelementStart(0, "label", 3);
        ɵɵtext(1);
        ɵɵelementEnd();
        ɵɵelementStart(2, "div", 4)(3, "input", 5, 0);
        ɵɵlistener("input", function MdbRangeComponent_Template_input_input_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.thumbPositionUpdate());
        })("blur", function MdbRangeComponent_Template_input_blur_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.blurRangeInput());
        })("mousedown", function MdbRangeComponent_Template_input_mousedown_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.focusRangeInput());
        })("mouseup", function MdbRangeComponent_Template_input_mouseup_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.blurRangeInput());
        })("touchstart", function MdbRangeComponent_Template_input_touchstart_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.focusRangeInput());
        })("touchend", function MdbRangeComponent_Template_input_touchend_3_listener() {
          ɵɵrestoreView(_r1);
          return ɵɵresetView(ctx.blurRangeInput());
        });
        ɵɵelementEnd();
        ɵɵelementStart(5, "span", 6, 1)(7, "span", 7, 2);
        ɵɵtext(9);
        ɵɵelementEnd()()();
      }
      if (rf & 2) {
        ɵɵadvance();
        ɵɵtextInterpolate(ctx.label);
        ɵɵadvance(2);
        ɵɵproperty("name", ctx.name)("disabled", ctx.disabled)("id", ctx.id)("min", ctx.min)("max", ctx.max)("step", ctx.step)("value", ctx.value)("id", ctx.id);
        ɵɵadvance(2);
        ɵɵproperty("ngStyle", ctx.thumbStyle)("ngClass", ɵɵpureFunction1(12, _c3, ctx.visibility));
        ɵɵadvance(4);
        ɵɵtextInterpolate(ctx.value);
      }
    },
    dependencies: [NgClass, NgStyle],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbRangeComponent, [{
    type: Component,
    args: [{
      selector: "mdb-range",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [RANGE_VALUE_ACCESOR],
      template: `<label for="id" class="form-label">{{ label }}</label>
<div class="range">
  <input
    #input
    [name]="name"
    type="range"
    [disabled]="disabled"
    [id]="id"
    [min]="min"
    [max]="max"
    [step]="step"
    [value]="value"
    class="form-range"
    min="0"
    max="5"
    [id]="id"
    (input)="thumbPositionUpdate()"
    (blur)="blurRangeInput()"
    (mousedown)="focusRangeInput()"
    (mouseup)="blurRangeInput()"
    (touchstart)="focusRangeInput()"
    (touchend)="blurRangeInput()"
  />
  <span #thumb class="thumb" [ngStyle]="thumbStyle" [ngClass]="{ 'thumb-active': this.visibility }">
    <span #thumbValue class="thumb-value">{{ value }}</span>
  </span>
</div>
`
    }]
  }], () => [{
    type: ChangeDetectorRef
  }], {
    input: [{
      type: ViewChild,
      args: ["input"]
    }],
    thumb: [{
      type: ViewChild,
      args: ["thumb"]
    }],
    thumbValue: [{
      type: ViewChild,
      args: ["thumbValue"]
    }],
    id: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    step: [{
      type: Input
    }],
    default: [{
      type: Input
    }],
    defaultRangeCounterClass: [{
      type: Input
    }],
    rangeValueChange: [{
      type: Output
    }],
    onchange: [{
      type: HostListener,
      args: ["change", ["$event"]]
    }],
    onInput: [{
      type: HostListener,
      args: ["input"]
    }]
  });
})();
var MdbRangeModule = class _MdbRangeModule {
  static ɵfac = function MdbRangeModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbRangeModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbRangeModule,
    declarations: [MdbRangeComponent],
    imports: [CommonModule, FormsModule],
    exports: [MdbRangeComponent]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, FormsModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbRangeModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, FormsModule],
      declarations: [MdbRangeComponent],
      exports: [MdbRangeComponent]
    }]
  }], null, null);
})();
export {
  MdbRangeComponent,
  MdbRangeModule
};
//# sourceMappingURL=mdb-angular-ui-kit_range.js.map
