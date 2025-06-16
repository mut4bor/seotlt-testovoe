import { useState } from 'react';
import { INews, INewsFormData } from '@/types/news';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { NewsList } from '@/components/NewsList';
import { NewsForm } from '@/components/NewsForm';
import { Modal } from '@/components/Modal';
import styles from './style.module.scss';

export const NewsApp = () => {
  const [news, setNews] = useLocalStorage<INews[]>('news', []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<INews | undefined>();

  const generateId = () => Date.now().toString();

  const handleAdd = (formData: INewsFormData) => {
    const newNews: INews = {
      id: generateId(),
      title: formData.title,
      content: formData.content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setNews(prev => [newNews, ...prev]);
    setIsModalOpen(false);
  };

  const handleEdit = (news: INews) => {
    setEditingNews(news);
    setIsModalOpen(true);
  };

  const handleUpdate = (formData: INewsFormData) => {
    if (!editingNews) return;

    const updatedNews: INews = {
      ...editingNews,
      title: formData.title,
      content: formData.content,
      updatedAt: new Date().toISOString(),
    };

    setNews(prev =>
      prev.map(item => (item.id === editingNews.id ? updatedNews : item))
    );
    setIsModalOpen(false);
    setEditingNews(undefined);
  };

  const handleDelete = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
  };

  const openAddModal = () => {
    setEditingNews(undefined);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNews(undefined);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Seotlt News</h1>
        <button onClick={openAddModal} className={styles.addButton}>
          Добавить новость
        </button>
      </header>

      <main className={styles.main}>
        <NewsList news={news} onEdit={handleEdit} onDelete={handleDelete} />
      </main>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <NewsForm
          news={editingNews}
          onSubmit={editingNews ? handleUpdate : handleAdd}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};
