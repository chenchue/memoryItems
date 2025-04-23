export type KnowledgeItem = {
    id: number;
    title: string;
    content: string;
    category: string;
    favorite: boolean;
};

// In-memory data storage
let items: KnowledgeItem[] = [];

/**
 * Returns all knowledge items.
 */
export function getAllItems(): KnowledgeItem[] {
    return items;
}

/**
 * Adds a new knowledge item.
 * @param data - The item data excluding the ID
 * @returns The newly added item with a generated ID
 */
export function addItem(data: Omit<KnowledgeItem, "id">): KnowledgeItem {
    const newItem: KnowledgeItem = {
        id: Date.now(),
        ...data
    };
    items.push(newItem);
    return newItem;
}
