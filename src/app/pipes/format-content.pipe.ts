import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatContent',
  standalone: true
})
export class FormatContentPipe implements PipeTransform {
  transform(content: string | undefined): string {
    if (!content) return '';
    
    // Convert line breaks to paragraphs
    return content
      .split('\n\n')
      .filter(paragraph => paragraph.trim() !== '')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('');
  }
}