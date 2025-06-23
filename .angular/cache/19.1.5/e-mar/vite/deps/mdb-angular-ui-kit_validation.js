import {
  coerceBooleanProperty
} from "./chunk-3EENIVFQ.js";
import {
  CommonModule
} from "./chunk-35LGTL4I.js";
import {
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  NgModule,
  Renderer2,
  setClassMetadata,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-UOGU5TIC.js";
import {
  Subject,
  fromEvent,
  takeUntil
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/mdb-angular-ui-kit/fesm2022/mdb-angular-ui-kit-validation.mjs
var _c0 = ["*"];
var MdbValidateDirective = class _MdbValidateDirective {
  renderer;
  _elementRef;
  _validate = true;
  _validateSuccess = true;
  _validateError = true;
  get mdbValidate() {
    return this._mdbValidate;
  }
  set mdbValidate(value) {
    this._mdbValidate = coerceBooleanProperty(value);
  }
  _mdbValidate;
  get validate() {
    return this._validate;
  }
  set validate(value) {
    this._validate = coerceBooleanProperty(value);
    this.updateErrorClass();
    this.updateSuccessClass();
  }
  get validateSuccess() {
    return this._validateSuccess;
  }
  set validateSuccess(value) {
    this._validateSuccess = coerceBooleanProperty(value);
    this.updateSuccessClass();
  }
  get validateError() {
    return this._validateError;
  }
  set validateError(value) {
    this._validateError = coerceBooleanProperty(value);
    this.updateErrorClass();
    this.updateSuccessClass();
  }
  constructor(renderer, _elementRef) {
    this.renderer = renderer;
    this._elementRef = _elementRef;
  }
  updateSuccessClass() {
    if (this.validate && this.validateSuccess) {
      this.renderer.addClass(this._elementRef.nativeElement, "validate-success");
    } else {
      this.renderer.removeClass(this._elementRef.nativeElement, "validate-success");
    }
  }
  updateErrorClass() {
    if (this.validate && this.validateError) {
      this.renderer.addClass(this._elementRef.nativeElement, "validate-error");
    } else {
      this.renderer.removeClass(this._elementRef.nativeElement, "validate-error");
    }
  }
  ngOnInit() {
    this.updateSuccessClass();
    this.updateErrorClass();
  }
  static ngAcceptInputType_mdbValidate;
  static ngAcceptInputType_validate;
  static ngAcceptInputType_validateSuccess;
  static ngAcceptInputType_validateError;
  static ɵfac = function MdbValidateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbValidateDirective)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ElementRef));
  };
  static ɵdir = ɵɵdefineDirective({
    type: _MdbValidateDirective,
    selectors: [["", "mdbValidate", ""]],
    inputs: {
      mdbValidate: "mdbValidate",
      validate: "validate",
      validateSuccess: "validateSuccess",
      validateError: "validateError"
    },
    standalone: false
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbValidateDirective, [{
    type: Directive,
    args: [{
      // eslint-disable-next-line @angular-eslint/directive-selector
      selector: "[mdbValidate]"
    }]
  }], () => [{
    type: Renderer2
  }, {
    type: ElementRef
  }], {
    mdbValidate: [{
      type: Input
    }],
    validate: [{
      type: Input
    }],
    validateSuccess: [{
      type: Input
    }],
    validateError: [{
      type: Input
    }]
  });
})();
var defaultIdNumber$1 = 0;
var MdbErrorDirective = class _MdbErrorDirective {
  _elementRef;
  renderer;
  id = `mdb-error-${defaultIdNumber$1++}`;
  errorMsg = true;
  messageId = this.id;
  _destroy$ = new Subject();
  constructor(_elementRef, renderer) {
    this._elementRef = _elementRef;
    this.renderer = renderer;
  }
  _getClosestEl(el, selector) {
    for (; el && el !== document; el = el.parentNode) {
      if (el.matches && el.matches(selector)) {
        return el;
      }
    }
    return null;
  }
  ngOnInit() {
    const textarea = this._getClosestEl(this._elementRef.nativeElement, "textarea");
    if (textarea) {
      let height = textarea.offsetHeight + 4 + "px";
      this.renderer.setStyle(this._elementRef.nativeElement, "top", height);
      fromEvent(textarea, "keyup").pipe(takeUntil(this._destroy$)).subscribe(() => {
        height = textarea.offsetHeight + 4 + "px";
        this.renderer.setStyle(this._elementRef.nativeElement, "top", height);
      });
    }
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
  static ɵfac = function MdbErrorDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbErrorDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbErrorDirective,
    selectors: [["mdb-error"]],
    hostVars: 3,
    hostBindings: function MdbErrorDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("id", ctx.messageId);
        ɵɵclassProp("error-message", ctx.errorMsg);
      }
    },
    inputs: {
      id: "id"
    },
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MdbErrorDirective_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbErrorDirective, [{
    type: Component,
    args: [{
      selector: "mdb-error",
      template: "<ng-content></ng-content>"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    id: [{
      type: Input
    }],
    errorMsg: [{
      type: HostBinding,
      args: ["class.error-message"]
    }],
    messageId: [{
      type: HostBinding,
      args: ["attr.id"]
    }]
  });
})();
var defaultIdNumber = 0;
var MdbSuccessDirective = class _MdbSuccessDirective {
  _elementRef;
  renderer;
  id = `mdb-success-${defaultIdNumber++}`;
  successMsg = true;
  messageId = this.id;
  _destroy$ = new Subject();
  constructor(_elementRef, renderer) {
    this._elementRef = _elementRef;
    this.renderer = renderer;
  }
  _getClosestEl(el, selector) {
    for (; el && el !== document; el = el.parentNode) {
      if (el.matches && el.matches(selector)) {
        return el;
      }
    }
    return null;
  }
  ngOnInit() {
    const textarea = this._getClosestEl(this._elementRef.nativeElement, "textarea");
    if (textarea) {
      let height = textarea.offsetHeight + 4 + "px";
      this.renderer.setStyle(this._elementRef.nativeElement, "top", height);
      fromEvent(textarea, "keyup").pipe(takeUntil(this._destroy$)).subscribe(() => {
        height = textarea.offsetHeight + 4 + "px";
        this.renderer.setStyle(this._elementRef.nativeElement, "top", height);
      });
    }
  }
  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
  static ɵfac = function MdbSuccessDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbSuccessDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _MdbSuccessDirective,
    selectors: [["mdb-success"]],
    hostVars: 3,
    hostBindings: function MdbSuccessDirective_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("id", ctx.messageId);
        ɵɵclassProp("success-message", ctx.successMsg);
      }
    },
    inputs: {
      id: "id"
    },
    standalone: false,
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function MdbSuccessDirective_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbSuccessDirective, [{
    type: Component,
    args: [{
      selector: "mdb-success",
      template: "<ng-content></ng-content>"
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    id: [{
      type: Input
    }],
    successMsg: [{
      type: HostBinding,
      args: ["class.success-message"]
    }],
    messageId: [{
      type: HostBinding,
      args: ["attr.id"]
    }]
  });
})();
var MdbValidationModule = class _MdbValidationModule {
  static ɵfac = function MdbValidationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MdbValidationModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _MdbValidationModule,
    declarations: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective],
    imports: [CommonModule],
    exports: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective]
  });
  static ɵinj = ɵɵdefineInjector({
    imports: [CommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MdbValidationModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective],
      exports: [MdbErrorDirective, MdbSuccessDirective, MdbValidateDirective]
    }]
  }], null, null);
})();
export {
  MdbErrorDirective,
  MdbSuccessDirective,
  MdbValidateDirective,
  MdbValidationModule
};
//# sourceMappingURL=mdb-angular-ui-kit_validation.js.map
