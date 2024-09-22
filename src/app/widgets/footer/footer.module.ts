import { NgModule } from '@angular/core';
import { Footer } from './footer.component';
import AppSvgModule from '../../common/app-svg-icon/app-svg-icon.module';

@NgModule({
  declarations: [Footer],
  imports: [AppSvgModule],
  exports: [Footer],
})
export default class FooterModule {}
