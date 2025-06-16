import React, { useState, useEffect, useId } from 'react';
import { INews, INewsFormData } from '@/types/news';
import styles from './style.module.scss';

interface NewsFormProps {
  news?: INews;
  onSubmit: (data: INewsFormData) => void;
  onCancel: () => void;
}

export const NewsForm = ({ news, onSubmit, onCancel }: NewsFormProps) => {
  const [formData, setFormData] = useState<INewsFormData>({
    title: '',
    content: '',
  });

  useEffect(() => {
    if (news) {
      setFormData({
        title: news.title,
        content: news.content,
      });
    }
  }, [news]);

  const titleID = useId();
  const textAreaID = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.content.trim()) {
      onSubmit(formData);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>
        {news ? 'Редактировать новость' : 'Добавить новость'}
      </h2>

      <label className={styles.fieldLabel} htmlFor={titleID}>
        <span>Заголовок</span>
        <input
          type="text"
          id={titleID}
          name="title"
          className={styles.titleInput}
          value={formData.title}
          onChange={handleChange}
          required
        />
      </label>

      <label className={styles.fieldLabel} htmlFor={textAreaID}>
        <span>Содержание</span>
        <textarea
          id={textAreaID}
          name="content"
          className={styles.contentTextArea}
          value={formData.content}
          onChange={handleChange}
          rows={6}
          required
        />
      </label>

      <div className={styles.buttons}>
        <button type="submit" className={styles.submitButton}>
          {news ? 'Обновить' : 'Создать'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className={styles.cancelButton}
        >
          Отмена
        </button>
      </div>
    </form>
  );
};
