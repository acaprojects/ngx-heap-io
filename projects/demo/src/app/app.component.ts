import { Component, ViewEncapsulation, ViewChild } from '@angular/core';

import { HeapIoService } from 'projects/library/src/lib/heap-io.service';

@Component({
    selector: 'app-root',
    template: `<div class="test></div>`,
    styles: [''],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    constructor(private heap_io: HeapIoService) { }

    public ngOnInit(): void {
        this.heap_io.load({ app_id: 3540602199, force_ssl: true, secure_cookie: true, disable_text_capture: true, cookie_path: '/' });
        this.heap_io.identify('test_user');
    }

}
