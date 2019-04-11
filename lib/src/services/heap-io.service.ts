import { Injectable } from '@angular/core';
import { LIBRARY_SETTINGS } from '../settings';

declare global {
    interface Window {
        heap: any;
        forceSSL: boolean;
        secureCookie: boolean;
        disableTextCapture: boolean;
        cookiePath: string;
    }
}

export interface IHeapIOOptions {
    /** Heap IO application identifier */
    app_id: string;
    /** Whether to force Heap IO connection to use SSL */
    force_ssl: boolean;
    /** Whether Heap IO cookies should be secure */
    secure_cookie: boolean;
    /** Whether Heap IO should not capture element content text */
    disable_text_capture: boolean;
    /** Limit Heap IO API cookies to given path on the domain */
    cookie_path: string
}

@Injectable({
    providedIn: 'root'
})
export class HeapIoService {
    /** Heap IO API object */
    private service: any;

    constructor() {
        const heap = window.heap || [];
        heap.load = function(e, t) {
            (window.heap.appid = e), (window.heap.config = t = t || {});
            let r = t.forceSSL || 'https:' === document.location.protocol,
                a = document.createElement('script');
            (a.type = 'text/javascript'),
                (a.async = !0),
                (a.src = (r ? 'https:' : 'http:') + '//cdn.heapanalytics.com/js/heap-' + e + '.js');
            let n = document.getElementsByTagName('script')[0];
            n.parentNode.insertBefore(a, n);
            for (
                let o = function(e) {
                        return function() {
                            heap.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                        };
                    },
                    p = [
                        'addEventProperties',
                        'addUserProperties',
                        'clearEventProperties',
                        'identify',
                        'removeEventProperty',
                        'setEventProperties',
                        'track',
                        'unsetEventProperty'
                    ],
                    c = 0;
                c < p.length;
                c++
            )
                heap[p[c]] = o(p[c]);
        };
        window.heap = heap;
        LIBRARY_SETTINGS.log('Service', 'Injected heap.io into page');
        this.service = heap;
    }

    /**
     * Initialise heap io with the given parameters
     * @param options 
     */
    public load(options: IHeapIOOptions) {
        if (!this.service) { throw new Error('Heap IO is not initialised'); }
        const heap_ops = {
            forceSSL: options.force_ssl,
            secureCookie: options.secure_cookie,
            disableTextCapture: options.disable_text_capture,
            cookiePath: options.cookie_path
        }
        LIBRARY_SETTINGS.log('Service', `Initialising heap.io for application: ${options.app_id}`);
        this.service.load(options.app_id, heap_ops);
    }

    /**
     * Set the identity of the Heap IO session
     * @param id Identity of the active session user
     */
    public identify(id: string) {
        if (!this.service) { throw new Error('Heap IO is not initialised'); }
        LIBRARY_SETTINGS.log('Service', `Set identity to: ${id}`);
        this.service.identify(id);
    }
    
    /**
     * Add properties associated with the identity given for the session
     * @param properties Map of properties. e.g. `{ prop1: prop1_value, prop2: prop2_value, ... }`
     */
    public addUserProperties(properties: { [name:string]: any }) {
        if (!this.service) { throw new Error('Heap IO is not initialised'); }
        LIBRARY_SETTINGS.log('Service', `Adding user properties: ${properties}`);
        this.service.traddUserPropertiesack(properties);
    }

    /**
     * Post new tracking event
     * @param event_name Name of the event
     * @param properties Map of event properties. e.g. `{ prop1: prop1_value, prop2: prop2_value, ... }`
     */
    public track(event_name: string, properties: { [name:string]: any }) {
        if (!this.service) { throw new Error('Heap IO is not initialised'); }
        LIBRARY_SETTINGS.log('Service', `Adding event tracking: ${event_name}, ${properties}`);
        this.service.track(event_name, properties);
    }

}
