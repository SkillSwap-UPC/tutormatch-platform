import { DefaultNamingStrategy, NamingStrategyInterface, Table } from 'typeorm';
import { snakeCase } from 'typeorm/util/StringUtils';
import * as pluralize from 'pluralize';

/**
 * Snake Case With Pluralized Table Naming Strategy
 * @summary
 * NamingStrategy implementation that converts entity names to snake_case 
 * and table names to pluralized snake_case.
 *
 * @since 1.0.0
 */
export class SnakeCasePluralizedNamingStrategy 
  extends DefaultNamingStrategy 
  implements NamingStrategyInterface {
  
  /**
   * Convert table name to pluralized snake case format
   * @param className Entity class name
   * @param customName Custom table name (if specified using @Entity decorator)
   */
  tableName(className: string, customName: string): string {
    return customName ? customName : this.pluralizeAndSnakeCase(className);
  }
  
  /**
   * Convert column name to snake case format
   * @param propertyName Entity property name
   * @param customName Custom column name (if specified using @Column decorator)
   */
  columnName(propertyName: string, customName: string): string {
    return customName ? customName : snakeCase(propertyName);
  }
  
  /**
   * Convert relationship name to snake case format
   * @param propertyName Entity property name
   */
  relationName(propertyName: string): string {
    return snakeCase(propertyName);
  }
  
  /**
   * Format join column name in snake case
   * @param relationName Relation property name
   * @param referencedColumnName Referenced column name
   * @param customName Custom name (if specified)
   */
  joinColumnName(relationName: string, referencedColumnName: string): string {
    return snakeCase(`${relationName}_${referencedColumnName}`);
  }
  
  /**
   * Format join table name in snake case pluralized format
   * @param firstTableName First entity table name
   * @param secondTableName Second entity table name
   * @param firstPropertyName First relation property name
   * @param secondPropertyName Second relation property name
   */
  joinTableName(
    firstTableName: string,
    secondTableName: string,
    firstPropertyName: string,
    secondPropertyName: string,
  ): string {
    return snakeCase(
      `${firstTableName}_${secondTableName}`
    );
  }
  
  /**
   * Format column name in join table
   * @param tableName Table name
   * @param propertyName Property name
   * @param columnName Column name
   */
  joinTableColumnName(
    tableName: string,
    propertyName: string,
    columnName: string,
  ): string {
    return snakeCase(`${tableName}_${columnName}`);
  }
  
  /**
   * Convert string to pluralized snake case format
   * @param input String to convert
   * @returns Pluralized snake case string
   */
  private pluralizeAndSnakeCase(input: string): string {
    return snakeCase(pluralize.plural(input));
  }
}