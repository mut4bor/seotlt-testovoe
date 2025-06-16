import { INews } from '@/types/news';
import styles from './style.module.scss';

interface NewsItemProps {
  news: INews;
  onEdit: (news: INews) => void;
  onDelete: (id: string) => void;
}

export const NewsItem = ({ news, onEdit, onDelete }: NewsItemProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить эту новость?')) {
      onDelete(news.id);
    }
  };

  return (
    <div className={styles.newsItem}>
      <div className={styles.header}>
        <h3 className={styles.title}>{news.title}</h3>
        <div className={styles.actions}>
          <button onClick={() => onEdit(news)} className={styles.editButton}>
            ✏️
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            🗑️
          </button>
        </div>
      </div>

      <p className={styles.content}>{news.content}</p>

      <div className={styles.meta}>
        <span>Создано: {formatDate(news.createdAt)}</span>
        {news.updatedAt !== news.createdAt && (
          <span>Изменено: {formatDate(news.updatedAt)}</span>
        )}
      </div>
    </div>
  );
};
