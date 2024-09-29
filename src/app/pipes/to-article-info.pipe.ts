import { Pipe, PipeTransform } from '@angular/core';
import { IArticle } from '../store/reducers/article/article.constants';

@Pipe({
  name: 'toArticleInfo',
})
export class ToArticleInfoPipe implements PipeTransform {
  transform(value: IArticle, ...args: any[]): Omit<IArticle, 'content'> {
    const intermediateValue: IArticle = { ...value };
    // @ts-ignore
    delete intermediateValue['content'];
    return intermediateValue;
  }
}
