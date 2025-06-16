import { INews } from '@/types/news';
import { NewsItem } from '@/components/NewsItem';
import styles from './style.module.scss';

interface NewsListProps {
  news: INews[];
  onEdit: (news: INews) => void;
  onDelete: (id: string) => void;
}

export const NewsList = ({ news, onEdit, onDelete }: NewsListProps) => {
  if (news.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Новостей пока нет. Добавьте первую новость!</p>
      </div>
    );
  }

  return (
    <div className={styles.newsList}>
      {news.map(item => (
        <NewsItem
          key={item.id}
          news={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
