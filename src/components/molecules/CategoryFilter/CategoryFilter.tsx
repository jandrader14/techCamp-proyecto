import React from "react";
import styles from "./CategoryFilter.module.css";
import { Button } from "../../atoms/Button/Button";

interface CategoryItem {
  label: string;
  value: string;
}

interface CategoryFilterProps {
  title: string;
  categories: CategoryItem[];
  onCategoryChange: (categoryValue: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  title,
  categories,
  onCategoryChange,
}) => {
  return (
    <div className={styles.categoryMainContainer}>
      <h1 className={styles.titleSection}>{title}</h1>
      <div className={styles.categoryContainer}>
        <div className={styles.categoryContent}>
          <ul className={styles.filter_list}>
            {categories.map((categoryItem) => (
              <li className={styles.itemCategory} key={categoryItem.value}>
                <Button
                  className={styles.buttonCategory}
                  onClick={() => onCategoryChange(categoryItem.value)}
                >
                  {categoryItem.label}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
