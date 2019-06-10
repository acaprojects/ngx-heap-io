import { HeapIoService } from './heap-io.service';

describe('HeapIoService', () => {
    let service: HeapIoService;
    let spy: jasmine.Spy;

    beforeEach(() => {
        service = new HeapIoService();
    });

    afterEach(() => {
        // Remove heap.io script
        const script = document.querySelector('script[src*="heapanalytics.com"]');
        if (script && script.parentElement) {
            script.parentElement.removeChild(script);
        }
        // Remove heap.io methods
        delete window.heap;
    })

    it('should create the instance', () => {
        expect(service).toBeTruthy();
    });

    it('should inject heap io library into the page', () => {
        // spy = spyOn(window.heap, 'load');
        service.load({ app_id: 'test', force_ssl: true, secure_cookie: true, disable_text_capture: true, cookie_path: '' });
        expect(document.querySelector('script[src*="heapanalytics.com"]')).toBeTruthy();
    });

    it('shouldn\'t allow usage before being initailised', () => {
        const props = {
            identify: ['test'],
            addUserProperties: [{ prop1: 'test' }],
            track: ['test_event', { prop1: 'test' }]
        };
        for (const k in props) {
            let error = null;
            try {
                service[k](...props[k]);
            } catch (e) {
                error = e;
            }
            expect(error).toBeTruthy();
        }
    });
});
