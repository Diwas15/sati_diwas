import { ErrorFactory, areCookiesEnabled, isIndexedDBAvailable, validateIndexedDBOpenable, getModularInstance, deepEqual } from '@firebase/util';
import { Logger, LogLevel } from '@firebase/logger';
import { __spreadArray, __assign } from 'tslib';
import { getApp, _getProvider, _registerComponent, registerVersion } from '@firebase/app';
import { Component } from '@firebase/component';
import '@firebase/installations';

var name = "@firebase/performance";
var version = "0.5.12";

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var SDK_VERSION = version;
/** The prefix for start User Timing marks used for creating Traces. */
var TRACE_START_MARK_PREFIX = 'FB-PERF-TRACE-START';
/** The prefix for stop User Timing marks used for creating Traces. */
var TRACE_STOP_MARK_PREFIX = 'FB-PERF-TRACE-STOP';
/** The prefix for User Timing measure used for creating Traces. */
var TRACE_MEASURE_PREFIX = 'FB-PERF-TRACE-MEASURE';
/** The prefix for out of the box page load Trace name. */
var OOB_TRACE_PAGE_LOAD_PREFIX = '_wt_';
var FIRST_PAINT_COUNTER_NAME = '_fp';
var FIRST_CONTENTFUL_PAINT_COUNTER_NAME = '_fcp';
var FIRST_INPUT_DELAY_COUNTER_NAME = '_fid';
var CONFIG_LOCAL_STORAGE_KEY = '@firebase/performance/config';
var CONFIG_EXPIRY_LOCAL_STORAGE_KEY = '@firebase/performance/configexpire';
var SERVICE = 'performance';
var SERVICE_NAME = 'Performance';

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var _a;
var ERROR_DESCRIPTION_MAP = (_a = {},
    _a["trace started" /* TRACE_STARTED_BEFORE */] = 'Trace {$traceName} was started before.',
    _a["trace stopped" /* TRACE_STOPPED_BEFORE */] = 'Trace {$traceName} is not running.',
    _a["nonpositive trace startTime" /* NONPOSITIVE_TRACE_START_TIME */] = 'Trace {$traceName} startTime should be positive.',
    _a["nonpositive trace duration" /* NONPOSITIVE_TRACE_DURATION */] = 'Trace {$traceName} duration should be positive.',
    _a["no window" /* NO_WINDOW */] = 'Window is not available.',
    _a["no app id" /* NO_APP_ID */] = 'App id is not available.',
    _a["no project id" /* NO_PROJECT_ID */] = 'Project id is not available.',
    _a["no api key" /* NO_API_KEY */] = 'Api key is not available.',
    _a["invalid cc log" /* INVALID_CC_LOG */] = 'Attempted to queue invalid cc event',
    _a["FB not default" /* FB_NOT_DEFAULT */] = 'Performance can only start when Firebase app instance is the default one.',
    _a["RC response not ok" /* RC_NOT_OK */] = 'RC response is not ok',
    _a["invalid attribute name" /* INVALID_ATTRIBUTE_NAME */] = 'Attribute name {$attributeName} is invalid.',
    _a["invalid attribute value" /* INVALID_ATTRIBUTE_VALUE */] = 'Attribute value {$attributeValue} is invalid.',
    _a["invalid custom metric name" /* INVALID_CUSTOM_METRIC_NAME */] = 'Custom metric name {$customMetricName} is invalid',
    _a["invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */] = 'Input for String merger is invalid, contact support team to resolve.',
    _a["already initialized" /* ALREADY_INITIALIZED */] = 'initializePerformance() has already been called with ' +
        'different options. To avoid this error, call initializePerformance() with the ' +
        'same options as when it was originally called, or call getPerformance() to return the' +
        ' already initialized instance.',
    _a);
var ERROR_FACTORY = new ErrorFactory(SERVICE, SERVICE_NAME, ERROR_DESCRIPTION_MAP);

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var consoleLogger = new Logger(SERVICE_NAME);
consoleLogger.logLevel = LogLevel.INFO;

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var apiInstance;
var windowInstance;
/**
 * This class holds a reference to various browser related objects injected by
 * set methods.
 */
var Api = /** @class */ (function () {
    function Api(window) {
        this.window = window;
        if (!window) {
            throw ERROR_FACTORY.create("no window" /* NO_WINDOW */);
        }
        this.performance = window.performance;
        this.PerformanceObserver = window.PerformanceObserver;
        this.windowLocation = window.location;
        this.navigator = window.navigator;
        this.document = window.document;
        if (this.navigator && this.navigator.cookieEnabled) {
            // If user blocks cookies on the browser, accessing localStorage will
            // throw an exception.
            this.localStorage = window.localStorage;
        }
        if (window.perfMetrics && window.perfMetrics.onFirstInputDelay) {
            this.onFirstInputDelay = window.perfMetrics.onFirstInputDelay;
        }
    }
    Api.prototype.getUrl = function () {
        // Do not capture the string query part of url.
        return this.windowLocation.href.split('?')[0];
    };
    Api.prototype.mark = function (name) {
        if (!this.performance || !this.performance.mark) {
            return;
        }
        this.performance.mark(name);
    };
    Api.prototype.measure = function (measureName, mark1, mark2) {
        if (!this.performance || !this.performance.measure) {
            return;
        }
        this.performance.measure(measureName, mark1, mark2);
    };
    Api.prototype.getEntriesByType = function (type) {
        if (!this.performance || !this.performance.getEntriesByType) {
            return [];
        }
        return this.performance.getEntriesByType(type);
    };
    Api.prototype.getEntriesByName = function (name) {
        if (!this.performance || !this.performance.getEntriesByName) {
            return [];
        }
        return this.performance.getEntriesByName(name);
    };
    Api.prototype.getTimeOrigin = function () {
        // Polyfill the time origin with performance.timing.navigationStart.
        return (this.performance &&
            (this.performance.timeOrigin || this.performance.timing.navigationStart));
    };
    Api.prototype.requiredApisAvailable = function () {
        if (!fetch || !Promise || !areCookiesEnabled()) {
            consoleLogger.info('Firebase Performance cannot start if browser does not support fetch and Promise or cookie is disabled.');
            return false;
        }
        if (!isIndexedDBAvailable()) {
            consoleLogger.info('IndexedDB is not supported by current browswer');
            return false;
        }
        return true;
    };
    Api.prototype.setupObserver = function (entryType, callback) {
        if (!this.PerformanceObserver) {
            return;
        }
        var observer = new this.PerformanceObserver(function (list) {
            for (var _i = 0, _a = list.getEntries(); _i < _a.length; _i++) {
                var entry = _a[_i];
                // `entry` is a PerformanceEntry instance.
                callback(entry);
            }
        });
        // Start observing the entry types you care about.
        observer.observe({ entryTypes: [entryType] });
    };
    Api.getInstance = function () {
        if (apiInstance === undefined) {
            apiInstance = new Api(windowInstance);
        }
        return apiInstance;
    };
    return Api;
}());
function setupApi(window) {
    windowInstance = window;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var iid;
function getIidPromise(installationsService) {
    var iidPromise = installationsService.getId();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    iidPromise.then(function (iidVal) {
        iid = iidVal;
    });
    return iidPromise;
}
// This method should be used after the iid is retrieved by getIidPromise method.
function getIid() {
    return iid;
}
function getAuthTokenPromise(installationsService) {
    var authTokenPromise = installationsService.getToken();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    authTokenPromise.then(function (authTokenVal) {
    });
    return authTokenPromise;
}

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function mergeStrings(part1, part2) {
    var sizeDiff = part1.length - part2.length;
    if (sizeDiff < 0 || sizeDiff > 1) {
        throw ERROR_FACTORY.create("invalid String merger input" /* INVALID_STRING_MERGER_PARAMETER */);
    }
    var resultArray = [];
    for (var i = 0; i < part1.length; i++) {
        resultArray.push(part1.charAt(i));
        if (part2.length > i) {
            resultArray.push(part2.charAt(i));
        }
    }
    return resultArray.join('');
}

/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var settingsServiceInstance;
var SettingsService = /** @class */ (function () {
    function SettingsService() {
        // The variable which controls logging of automatic traces and HTTP/S network monitoring.
        this.instrumentationEnabled = true;
        // The variable which controls logging of custom traces.
        this.dataCollectionEnabled = true;
        // Configuration flags set through remote config.
        this.loggingEnabled = false;
        // Sampling rate between 0 and 1.
        this.tracesSamplingRate = 1;
        this.networkRequestsSamplingRate = 1;
        // Address of logging service.
        this.logEndPointUrl = 'https://firebaselogging.googleapis.com/v0cc/log?format=json_proto';
        // Performance event transport endpoint URL which should be compatible with proto3.
        // New Address for transport service, not configurable via Remote Config.
        this.flTransportEndpointUrl = mergeStrings('hts/frbslgigp.ogepscmv/ieo/eaylg', 'tp:/ieaeogn-agolai.o/1frlglgc/o');
        this.transportKey = mergeStrings('AzSC8r6ReiGqFMyfvgow', 'Iayx0u-XT3vksVM-pIV');
        // Source type for performance event logs.
        this.logSource = 462;
        // Flags which control per session logging of traces and network requests.
        this.logTraceAfterSampling = false;
        this.logNetworkAfterSampling = false;
        // TTL of config retrieved from remote config in hours.
        this.configTimeToLive = 12;
    }
    SettingsService.prototype.getFlTransportFullUrl = function () {
        return this.flTransportEndpointUrl.concat('?key=', this.transportKey);
    };
    SettingsService.getInstance = function () {
        if (settingsServiceInstance === undefined) {
            settingsServiceInstance = new SettingsService();
        }
        return settingsServiceInstance;
    };
    return SettingsService;
}());

/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var VisibilityState;
(function (VisibilityState) {
    VisibilityState[VisibilityState["UNKNOWN"] = 0] = "UNKNOWN";
    VisibilityState[VisibilityState["VISIBLE"] = 1] = "VISIBLE";
    VisibilityState[VisibilityState["HIDDEN"] = 2] = "HIDDEN";
})(VisibilityState || (VisibilityState = {}));
var RESERVED_ATTRIBUTE_PREFIXES = ['firebase_', 'google_', 'ga_'];
var ATTRIBUTE_FORMAT_REGEX = new RegExp('^[a-zA-Z]\\w*$');
var MAX_ATTRIBUTE_NAME_LENGTH = 40;
var MAX_ATTRIBUTE_VALUE_LENGTH = 100;
function getServiceWorkerStatus() {
    var navigator = Api.getInstance().navigator;
    if ('serviceWorker' in navigator) {
        if (navigator.serviceWorker.controller) {
            return 2 /* CONTROLLED */;
        }
        else {
            return 3 /* UNCONTROLLED */;
        }
    }
    else {
        return 1 /* UNSUPPORTED */;
    }
}
function getVisibilityState() {
    var document = Api.getInstance().document;
    var visibilityState = document.visibilityState;
    switch (visibilityState) {
        case 'visible':
            return VisibilityState.VISIBLE;
        case 'hidden':
            return VisibilityState.HIDDEN;
        default:
            return VisibilityState.UNKNOWN;
    }
}
function getEffectiveC