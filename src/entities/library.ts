export class Tag {
  name: string;
  color: string;

  constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

export class MaterialItem {
  name: string;
  dateAdded: string;
  tag: Tag;

  constructor(name: string, dateAdded: string, tag: Tag) {
    this.name = name;
    this.dateAdded = dateAdded;
    this.tag = tag;
  }

  // Получить расширение файла
  getFileExtension(): string {
    return this.name.split('.').pop() || '';
  }

  // Получить имя файла без расширения
  getFileNameWithoutExtension(): string {
    return this.name.substring(0, this.name.lastIndexOf('.')) || this.name;
  }

  // Получить дату в читаемом формате
  getFormattedDate(): string {
    const date = new Date(this.dateAdded);
    return date.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }
}

export class Folder {
  name: string;
  items: MaterialItem[];

  constructor(name: string, items: MaterialItem[] = []) {
    this.name = name;
    this.items = items;
  }

  // Автоматический подсчет количества файлов
  get filesCount(): number {
    return this.items.length;
  }

  // Получить файлы по тегу
  getItemsByTag(tagName: string): MaterialItem[] {
    return this.items.filter(item => item.tag.name === tagName);
  }

  // Получить файлы по расширению
  getItemsByExtension(extension: string): MaterialItem[] {
    return this.items.filter(item => item.getFileExtension() === extension);
  }

  // Получить последние добавленные файлы
  getRecentItems(limit: number = 5): MaterialItem[] {
    return [...this.items]
      .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
      .slice(0, limit);
  }
}