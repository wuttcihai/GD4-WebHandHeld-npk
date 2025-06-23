import {
  HttpBackend,
  HttpClient
} from "./chunk-WBBWBNFV.js";
import {
  APP_BASE_HREF,
  PlatformLocation,
  isPlatformBrowser,
  isPlatformServer
} from "./chunk-35LGTL4I.js";
import {
  ChangeDetectionStrategy,
  Component,
  ComponentFactoryResolver$1,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  NgModule,
  Optional,
  Output,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  ViewContainerRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵinject,
  ɵɵsetNgModuleScope
} from "./chunk-UOGU5TIC.js";
import {
  catchError,
  map,
  of,
  share,
  tap,
  throwError
} from "./chunk-ILOBLWYU.js";
import "./chunk-3OV72XIM.js";

// node_modules/ng-inline-svg/lib_esmodule/inline-svg.config.js
var InlineSVGConfig = /* @__PURE__ */ function() {
  function InlineSVGConfig2() {
  }
  return InlineSVGConfig2;
}();

// node_modules/ng-inline-svg/lib_esmodule/inline-svg.service.js
var InlineSVGService = function() {
  function InlineSVGService2(rendererFactory) {
    this._ranScripts = {};
    this._renderer = rendererFactory.createRenderer(null, null);
  }
  InlineSVGService2.prototype.insertEl = function(dir, parentEl, content, replaceContents, prepend) {
    if (replaceContents && !prepend) {
      var parentNode = dir._prevSVG && dir._prevSVG.parentNode;
      if (parentNode) {
        this._renderer.removeChild(parentNode, dir._prevSVG);
      }
      parentEl.innerHTML = "";
    }
    if (prepend) {
      this._renderer.insertBefore(parentEl, content, parentEl.firstChild);
    } else {
      this._renderer.appendChild(parentEl, content);
    }
    if (content.nodeName === "svg") {
      dir._prevSVG = content;
    }
  };
  InlineSVGService2.prototype.evalScripts = function(svg, url, evalMode) {
    var scripts = svg.querySelectorAll("script");
    var scriptsToEval = [];
    for (var i = 0; i < scripts.length; i++) {
      var scriptType = scripts[i].getAttribute("type");
      if (!scriptType || scriptType === "application/ecmascript" || scriptType === "application/javascript") {
        var script = scripts[i].innerText || scripts[i].textContent;
        scriptsToEval.push(script);
        this._renderer.removeChild(scripts[i].parentNode, scripts[i]);
      }
    }
    if (scriptsToEval.length > 0 && (evalMode === "always" || evalMode === "once" && !this._ranScripts[url])) {
      for (var i = 0; i < scriptsToEval.length; i++) {
        new Function(scriptsToEval[i])(window);
      }
      this._ranScripts[url] = true;
    }
  };
  InlineSVGService2.ɵfac = function InlineSVGService_Factory(t) {
    return new (t || InlineSVGService2)(ɵɵinject(RendererFactory2));
  };
  InlineSVGService2.ɵprov = ɵɵdefineInjectable({
    token: InlineSVGService2,
    factory: InlineSVGService2.ɵfac,
    providedIn: "root"
  });
  return InlineSVGService2;
}();
(function() {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InlineSVGService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: RendererFactory2
    }];
  }, null);
})();

// node_modules/ng-inline-svg/lib_esmodule/inline-svg.component.js
var InlineSVGComponent = function() {
  function InlineSVGComponent2(_inlineSVGService, el) {
    this._inlineSVGService = _inlineSVGService;
    this._el = el;
  }
  InlineSVGComponent2.prototype.ngAfterViewInit = function() {
    this._updateContent();
  };
  InlineSVGComponent2.prototype.ngOnChanges = function(changes) {
    if (changes["content"]) {
      this._updateContent();
    }
  };
  InlineSVGComponent2.prototype._updateContent = function() {
    this._inlineSVGService.insertEl(this.context, this._el.nativeElement, this.content, this.replaceContents, this.prepend);
  };
  InlineSVGComponent2.ɵfac = function InlineSVGComponent_Factory(t) {
    return new (t || InlineSVGComponent2)(ɵɵdirectiveInject(InlineSVGService), ɵɵdirectiveInject(ElementRef));
  };
  InlineSVGComponent2.ɵcmp = ɵɵdefineComponent({
    type: InlineSVGComponent2,
    selectors: [["inline-svg"]],
    inputs: {
      context: "context",
      content: "content",
      replaceContents: "replaceContents",
      prepend: "prepend"
    },
    features: [ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function InlineSVGComponent_Template(rf, ctx) {
    },
    encapsulation: 2,
    changeDetection: 0
  });
  return InlineSVGComponent2;
}();
(function() {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InlineSVGComponent, [{
    type: Component,
    args: [{
      selector: "inline-svg",
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush
    }]
  }], function() {
    return [{
      type: InlineSVGService
    }, {
      type: ElementRef
    }];
  }, {
    context: [{
      type: Input
    }],
    content: [{
      type: Input
    }],
    replaceContents: [{
      type: Input
    }],
    prepend: [{
      type: Input
    }]
  });
})();

// node_modules/ng-inline-svg/lib_esmodule/svg-cache.service.js
var SVGCacheService = function() {
  function SVGCacheService2(_appBase, _location, _config, httpClient, httpBackend, rendererFactory) {
    this._appBase = _appBase;
    this._location = _location;
    this._config = _config;
    this._http = _config && !_config.bypassHttpClientInterceptorChain ? httpClient : new HttpClient(httpBackend);
    this._renderer = rendererFactory.createRenderer(null, null);
    this.setBaseUrl();
    if (!SVGCacheService2._cache) {
      SVGCacheService2._cache = /* @__PURE__ */ new Map();
    }
    if (!SVGCacheService2._inProgressReqs) {
      SVGCacheService2._inProgressReqs = /* @__PURE__ */ new Map();
    }
  }
  SVGCacheService2.prototype.getSVG = function(url, resolveSVGUrl, cache) {
    var _this = this;
    if (cache === void 0) {
      cache = true;
    }
    var svgUrl = (resolveSVGUrl ? this.getAbsoluteUrl(url) : url).replace(/#.+$/, "");
    if (cache && SVGCacheService2._cache.has(svgUrl)) {
      return of(this._cloneSVG(SVGCacheService2._cache.get(svgUrl)));
    }
    if (SVGCacheService2._inProgressReqs.has(svgUrl)) {
      return SVGCacheService2._inProgressReqs.get(svgUrl);
    }
    var req = this._http.get(svgUrl, {
      responseType: "text"
    }).pipe(tap(function() {
      SVGCacheService2._inProgressReqs.delete(svgUrl);
    }), catchError(function(error) {
      SVGCacheService2._inProgressReqs.delete(svgUrl);
      return throwError(error.message);
    }), share(), map(function(svgText) {
      var svgEl = _this._svgElementFromString(svgText);
      SVGCacheService2._cache.set(svgUrl, svgEl);
      return _this._cloneSVG(svgEl);
    }));
    SVGCacheService2._inProgressReqs.set(svgUrl, req);
    return req;
  };
  SVGCacheService2.prototype.setBaseUrl = function() {
    if (this._config) {
      this._baseUrl = this._config.baseUrl;
    } else if (this._appBase !== null) {
      this._baseUrl = this._appBase;
    } else if (this._location !== null) {
      this._baseUrl = this._location.getBaseHrefFromDOM();
    }
  };
  SVGCacheService2.prototype.getAbsoluteUrl = function(url) {
    if (this._baseUrl && !/^https?:\/\//i.test(url)) {
      url = this._baseUrl + url;
      if (url.indexOf("//") === 0) {
        url = url.substring(1);
      }
    }
    var base = this._renderer.createElement("BASE");
    base.href = url;
    return base.href;
  };
  SVGCacheService2.prototype._svgElementFromString = function(str) {
    var div = this._renderer.createElement("DIV");
    div.innerHTML = str;
    var svg = div.querySelector("svg");
    if (!svg) {
      throw new Error("No SVG found in loaded contents");
    }
    return svg;
  };
  SVGCacheService2.prototype._cloneSVG = function(svg) {
    return svg.cloneNode(true);
  };
  SVGCacheService2.ɵfac = function SVGCacheService_Factory(t) {
    return new (t || SVGCacheService2)(ɵɵinject(APP_BASE_HREF, 8), ɵɵinject(PlatformLocation, 8), ɵɵinject(InlineSVGConfig, 8), ɵɵinject(HttpClient), ɵɵinject(HttpBackend), ɵɵinject(RendererFactory2));
  };
  SVGCacheService2.ɵprov = ɵɵdefineInjectable({
    token: SVGCacheService2,
    factory: SVGCacheService2.ɵfac,
    providedIn: "root"
  });
  return SVGCacheService2;
}();
(function() {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SVGCacheService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [APP_BASE_HREF]
      }]
    }, {
      type: PlatformLocation,
      decorators: [{
        type: Optional
      }]
    }, {
      type: InlineSVGConfig,
      decorators: [{
        type: Optional
      }]
    }, {
      type: HttpClient
    }, {
      type: HttpBackend
    }, {
      type: RendererFactory2
    }];
  }, null);
})();

// node_modules/ng-inline-svg/lib_esmodule/svg-util.js
function isUrlSymbol(url) {
  return url.charAt(0) === "#" || url.indexOf(".svg#") > -1;
}
function isSvgSupported() {
  return typeof SVGRect !== "undefined";
}
function createSymbolSvg(renderer, svg, symbolId) {
  var symbol = svg.querySelector('[id="' + symbolId + '"]');
  if (!symbol) {
    throw new Error('Symbol "' + symbolId + '" not found');
  }
  var elSvg = renderer.createElement("svg", "svg");
  renderer.appendChild(elSvg, symbol);
  var elSvgUse = renderer.createElement("use", "svg");
  renderer.setAttribute(elSvgUse, "href", "#" + symbolId, "xlink");
  renderer.appendChild(elSvg, elSvgUse);
  return elSvg;
}
function removeAttributes(element, attrs) {
  for (var i = 0; i < attrs.length; i++) {
    var elAttr = element.getAttribute(attrs[i]);
    if (elAttr) {
      element.removeAttribute(attrs[i]);
    }
  }
  var innerEls = element.getElementsByTagName("*");
  for (var i = 0; i < innerEls.length; i++) {
    removeAttributes(innerEls[i], attrs);
  }
}
function setAttributes(element, attrs) {
  for (var attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }
}

// node_modules/ng-inline-svg/lib_esmodule/inline-svg.directive.js
var InlineSVGDirective = function() {
  function InlineSVGDirective2(_el, _viewContainerRef, _resolver, _svgCache, _renderer, _inlineSVGService, _config, platformId) {
    this._el = _el;
    this._viewContainerRef = _viewContainerRef;
    this._resolver = _resolver;
    this._svgCache = _svgCache;
    this._renderer = _renderer;
    this._inlineSVGService = _inlineSVGService;
    this._config = _config;
    this.platformId = platformId;
    this.resolveSVGUrl = true;
    this.replaceContents = true;
    this.prepend = false;
    this.injectComponent = false;
    this.cacheSVG = true;
    this.forceEvalStyles = false;
    this.evalScripts = "always";
    this.onSVGInserted = new EventEmitter();
    this.onSVGFailed = new EventEmitter();
    this._supportsSVG = isSvgSupported();
    if (!isPlatformServer(this.platformId) && !this._supportsSVG) {
      this._fail("Embed SVG are not supported by this browser");
    }
  }
  InlineSVGDirective2.prototype.ngOnInit = function() {
    if (!this._isValidPlatform() || this._isSSRDisabled()) {
      return;
    }
    this._insertSVG();
  };
  InlineSVGDirective2.prototype.ngOnChanges = function(changes) {
    if (!this._isValidPlatform() || this._isSSRDisabled()) {
      return;
    }
    var setSVGAttributesChanged = Boolean(changes["setSVGAttributes"]);
    if (changes["inlineSVG"] || setSVGAttributesChanged) {
      this._insertSVG(setSVGAttributesChanged);
    }
  };
  InlineSVGDirective2.prototype.ngOnDestroy = function() {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  };
  InlineSVGDirective2.prototype._insertSVG = function(force) {
    var _this = this;
    if (force === void 0) {
      force = false;
    }
    if (!isPlatformServer(this.platformId) && !this._supportsSVG) {
      return;
    }
    if (!this.inlineSVG) {
      this._fail("No URL passed to [inlineSVG]");
      return;
    }
    if (!force && this.inlineSVG === this._prevUrl) {
      return;
    }
    this._prevUrl = this.inlineSVG;
    this._subscription = this._svgCache.getSVG(this.inlineSVG, this.resolveSVGUrl, this.cacheSVG).subscribe(function(svg) {
      if (isUrlSymbol(_this.inlineSVG)) {
        var symbolId = _this.inlineSVG.split("#")[1];
        svg = createSymbolSvg(_this._renderer, svg, symbolId);
      }
      _this._processSvg(svg);
    }, function(err) {
      _this._fail(err);
    });
  };
  InlineSVGDirective2.prototype._processSvg = function(svg) {
    if (!svg) {
      return;
    }
    if (this.removeSVGAttributes && isPlatformBrowser(this.platformId)) {
      removeAttributes(svg, this.removeSVGAttributes);
    }
    if (this.setSVGAttributes) {
      setAttributes(svg, this.setSVGAttributes);
    }
    if (this.onSVGLoaded) {
      svg = this.onSVGLoaded(svg, this._el.nativeElement);
    }
    this._insertEl(svg);
    if (isPlatformBrowser(this.platformId)) {
      this._inlineSVGService.evalScripts(svg, this.inlineSVG, this.evalScripts);
    }
    if (this.forceEvalStyles) {
      var styleTags = svg.querySelectorAll("style");
      Array.from(styleTags).forEach(function(tag) {
        return tag.textContent += "";
      });
    }
    this.onSVGInserted.emit(svg);
  };
  InlineSVGDirective2.prototype._insertEl = function(el) {
    if (this.injectComponent) {
      if (!this._svgComp) {
        var factory = this._resolver.resolveComponentFactory(InlineSVGComponent);
        this._svgComp = this._viewContainerRef.createComponent(factory);
      }
      this._svgComp.instance.context = this;
      this._svgComp.instance.replaceContents = this.replaceContents;
      this._svgComp.instance.prepend = this.prepend;
      this._svgComp.instance.content = el;
      this._renderer.appendChild(this._el.nativeElement, this._svgComp.injector.get(InlineSVGComponent)._el.nativeElement);
    } else {
      this._inlineSVGService.insertEl(this, this._el.nativeElement, el, this.replaceContents, this.prepend);
    }
  };
  InlineSVGDirective2.prototype._fail = function(msg) {
    this.onSVGFailed.emit(msg);
    if (this.fallbackImgUrl) {
      var elImg = this._renderer.createElement("IMG");
      this._renderer.setAttribute(elImg, "src", this.fallbackImgUrl);
      this._insertEl(elImg);
    } else if (this.fallbackSVG && this.fallbackSVG !== this.inlineSVG) {
      this.inlineSVG = this.fallbackSVG;
      this._insertSVG();
    }
  };
  InlineSVGDirective2.prototype._isValidPlatform = function() {
    return isPlatformServer(this.platformId) || isPlatformBrowser(this.platformId);
  };
  InlineSVGDirective2.prototype._isSSRDisabled = function() {
    return isPlatformServer(this.platformId) && this._config && this._config.clientOnly;
  };
  InlineSVGDirective2.ɵfac = function InlineSVGDirective_Factory(t) {
    return new (t || InlineSVGDirective2)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(ComponentFactoryResolver$1), ɵɵdirectiveInject(SVGCacheService), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(InlineSVGService), ɵɵdirectiveInject(InlineSVGConfig, 8), ɵɵdirectiveInject(PLATFORM_ID));
  };
  InlineSVGDirective2.ɵdir = ɵɵdefineDirective({
    type: InlineSVGDirective2,
    selectors: [["", "inlineSVG", ""]],
    inputs: {
      inlineSVG: "inlineSVG",
      resolveSVGUrl: "resolveSVGUrl",
      replaceContents: "replaceContents",
      prepend: "prepend",
      injectComponent: "injectComponent",
      cacheSVG: "cacheSVG",
      setSVGAttributes: "setSVGAttributes",
      removeSVGAttributes: "removeSVGAttributes",
      forceEvalStyles: "forceEvalStyles",
      evalScripts: "evalScripts",
      fallbackImgUrl: "fallbackImgUrl",
      fallbackSVG: "fallbackSVG",
      onSVGLoaded: "onSVGLoaded"
    },
    outputs: {
      onSVGInserted: "onSVGInserted",
      onSVGFailed: "onSVGFailed"
    },
    features: [ɵɵProvidersFeature([SVGCacheService]), ɵɵNgOnChangesFeature]
  });
  return InlineSVGDirective2;
}();
(function() {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InlineSVGDirective, [{
    type: Directive,
    args: [{
      selector: "[inlineSVG]",
      providers: [SVGCacheService]
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: ViewContainerRef
    }, {
      type: ComponentFactoryResolver$1
    }, {
      type: SVGCacheService
    }, {
      type: Renderer2
    }, {
      type: InlineSVGService
    }, {
      type: InlineSVGConfig,
      decorators: [{
        type: Optional
      }]
    }, {
      type: Object,
      decorators: [{
        type: Inject,
        args: [PLATFORM_ID]
      }]
    }];
  }, {
    inlineSVG: [{
      type: Input
    }],
    resolveSVGUrl: [{
      type: Input
    }],
    replaceContents: [{
      type: Input
    }],
    prepend: [{
      type: Input
    }],
    injectComponent: [{
      type: Input
    }],
    cacheSVG: [{
      type: Input
    }],
    setSVGAttributes: [{
      type: Input
    }],
    removeSVGAttributes: [{
      type: Input
    }],
    forceEvalStyles: [{
      type: Input
    }],
    evalScripts: [{
      type: Input
    }],
    fallbackImgUrl: [{
      type: Input
    }],
    fallbackSVG: [{
      type: Input
    }],
    onSVGLoaded: [{
      type: Input
    }],
    onSVGInserted: [{
      type: Output
    }],
    onSVGFailed: [{
      type: Output
    }]
  });
})();

// node_modules/ng-inline-svg/lib_esmodule/inline-svg.module.js
var InlineSVGModule = function() {
  function InlineSVGModule2() {
  }
  InlineSVGModule2.forRoot = function(config) {
    return {
      ngModule: InlineSVGModule2,
      providers: [{
        provide: InlineSVGConfig,
        useValue: config
      }]
    };
  };
  InlineSVGModule2.ɵfac = function InlineSVGModule_Factory(t) {
    return new (t || InlineSVGModule2)();
  };
  InlineSVGModule2.ɵmod = ɵɵdefineNgModule({
    type: InlineSVGModule2
  });
  InlineSVGModule2.ɵinj = ɵɵdefineInjector({});
  return InlineSVGModule2;
}();
(function() {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InlineSVGModule, [{
    type: NgModule,
    args: [{
      declarations: [InlineSVGDirective, InlineSVGComponent],
      exports: [InlineSVGDirective],
      entryComponents: [InlineSVGComponent]
    }]
  }], null, null);
})();
(function() {
  (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(InlineSVGModule, {
    declarations: [InlineSVGDirective, InlineSVGComponent],
    exports: [InlineSVGDirective]
  });
})();
export {
  InlineSVGConfig,
  InlineSVGDirective,
  InlineSVGModule,
  SVGCacheService
};
//# sourceMappingURL=ng-inline-svg.js.map
