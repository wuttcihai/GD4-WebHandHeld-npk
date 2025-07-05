import {
  coerceBooleanProperty
} from "./chunk-3EENIVFQ.js";
import {
  FormsModule,
  NG_VALUE_ACCESSOR
} from "./chunk-RBKNLYNS.js";
import {
  CommonModule
} from "./chunk-35LGTL4I.js";
import {
  ContentChildren,
  Directive,
  HostBinding,
  Input,
  NgModule,
  forwardRef,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵcontentQuery,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵhostProperty,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  from,
  startWith,
  switchMap,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-radio.mjs
var MdbRadioDirective = class _MdbRadioDirective {
  get name() {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }
  _name;
  get checked() {
    return this._checked;
  }
  set checked(value) {
    this._checked = coerceBooleanProperty(value);
  }
  _checked = false;
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
  }
  _value = null;
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
  }
  _disabled = false;
  get isDisabled() {
    return this._disabled;
  }
  get isChecked() {
    return this._checked;
  }
  get nameAttr() {
    return this.name;
  }
  constructor() {
  }
  _updateName(value) {
    this._name = value;
  }
  _updateChecked(value) {
    this._checked = value;
  }
  _updateDisabledState(value) {
    this._disabled = value;
  }
  static ngAcceptInputType_checked;
  static ngAcceptInputType_disabled;
  static ɵfac = function MdbRadioDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbRadioDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbRadioDirective,
    selectors: [["", "mdbRadio", ""]],
    hostVars: 3,
    hostBindings: function MdbRadioDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵhostProperty("disabled", ctx.isDisabled)("checked", ctx.isChecked);
        ɵɵattribute("name", ctx.nameAttr);
      }
    },
    inputs: {
      name: "name",
      checked: "checked",
      value: "value",
      disabled: "disabled"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbRadioDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbRadio]"
    }]
  }], () => [], {
    name: [{
      type: Input
    }],
    checked: [{
      type: Input,
      args: ["checked"]
    }],
    value: [{
      type: Input,
      args: ["value"]
    }],
    disabled: [{
      type: Input,
      args: ["disabled"]
    }],
    isDisabled: [{
      type: HostBinding,
      args: ["disabled"]
    }],
    isChecked: [{
      type: HostBinding,
      args: ["checked"]
    }],
    nameAttr: [{
      type: HostBinding,
      args: ["attr.name"]
    }]
  });
})();
var MDB_RADIO_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  // eslint-disable-next-line no-use-before-define, @typescript-eslint/no-use-before-define
  useExisting: forwardRef(() => MdbRadioGroupDirective),
  multi: true
};
var MdbRadioGroupDirective = class _MdbRadioGroupDirective {
  radios;
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = value;
    if (this.radios) {
      this._updateChecked();
    }
  }
  _value;
  get name() {
    return this._name;
  }
  set name(name) {
    this._name = name;
    if (this.radios) {
      this._updateNames();
    }
  }
  _name;
  get disabled() {
    return this._disabled;
  }
  set disabled(disabled) {
    this._disabled = disabled;
    if (this.radios) {
      this._updateDisabled();
    }
  }
  _disabled = false;
  _destroy$ = new Subject();
  onChange = (_) => {
  };
  onTouched = () => {
  };
  ngAfterContentInit() {
    this._updateNames();
    this._updateDisabled();
    this.radios.changes.pipe(startWith(this.radios), switchMap((radios) => from(Promise.resolve(radios))), takeUntil(this._destroy$)).subscribe(() => this._updateRadiosState());
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
  _updateRadiosState() {
    this._updateNames();
    this._updateChecked();
    this._updateDisabled();
  }
  _updateNames() {
    this.radios.forEach((radio) => radio._updateName(this.name));
  }
  _updateChecked() {
    this.radios.forEach((radio) => {
      const isChecked = radio.value === this._value;
      radio._updateChecked(isChecked);
    });
  }
  _updateDisabled() {
    this.radios.forEach((radio) => radio._updateDisabledState(this._disabled));
  }
  // Control value accessor methods
  registerOnChange(fn) {
    this.onChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled) {
    this._disabled = isDisabled;
    this._updateDisabled();
  }
  writeValue(value) {
    this.value = value;
  }
  static ɵfac = function MdbRadioGroupDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbRadioGroupDirective)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbRadioGroupDirective,
    selectors: [["", "mdbRadioGroup", ""]],
    contentQueries: function MdbRadioGroupDirective_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, MdbRadioDirective, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.radios = _t);
      }
    },
    inputs: {
      value: "value",
      name: "name",
      disabled: "disabled"
    },
    standalone: false,
    features: [ɵɵProvidersFeature([MDB_RADIO_GROUP_VALUE_ACCESSOR])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbRadioGroupDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbRadioGroup]",
      providers: [MDB_RADIO_GROUP_VALUE_ACCESSOR]
    }]
  }], null, {
    radios: [{
      type: ContentChildren,
      args: [MdbRadioDirective, {
        descendants: true
      }]
    }],
    value: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }]
  });
})();
var MdbRadioModule = class _MdbRadioModule {
  static ɵfac = function MdbRadioModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbRadioModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbRadioModule,
    declarations: [MdbRadioDirective, MdbRadioGroupDirective],
    imports: [CommonModule, FormsModule],
    exports: [MdbRadioDirective, MdbRadioGroupDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule, FormsModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbRadioModule, [{
    type: NgModule,
    args: [{
      declarations: [MdbRadioDirective, MdbRadioGroupDirective],
      exports: [MdbRadioDirective, MdbRadioGroupDirective],
      imports: [CommonModule, FormsModule]
    }]
  }], null, null);
})();
export {
  MDB_RADIO_GROUP_VALUE_ACCESSOR,
  MdbRadioDirective,
  MdbRadioGroupDirective,
  MdbRadioModule
};
//# sourceMappingURL=mdb-angular-ui-kit_radio.js.map
