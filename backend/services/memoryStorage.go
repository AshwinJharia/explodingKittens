package services

import (
	"fmt"
	"sync"
)

type MemoryStorage struct {
	data  map[string]map[string]string
	mutex sync.RWMutex
}

func NewMemoryStorage() *MemoryStorage {
	return &MemoryStorage{
		data: make(map[string]map[string]string),
	}
}

func (m *MemoryStorage) HSet(table, key, value string) error {
	m.mutex.Lock()
	defer m.mutex.Unlock()
	
	if m.data[table] == nil {
		m.data[table] = make(map[string]string)
	}
	m.data[table][key] = value
	return nil
}

func (m *MemoryStorage) HGet(table, key string) (string, error) {
	m.mutex.RLock()
	defer m.mutex.RUnlock()
	
	if m.data[table] == nil {
		return "", fmt.Errorf("key not found")
	}
	
	value, exists := m.data[table][key]
	if !exists {
		return "", fmt.Errorf("key not found")
	}
	return value, nil
}

func (m *MemoryStorage) HGetAll(table string) (map[string]string, error) {
	m.mutex.RLock()
	defer m.mutex.RUnlock()
	
	if m.data[table] == nil {
		return make(map[string]string), nil
	}
	
	result := make(map[string]string)
	for k, v := range m.data[table] {
		result[k] = v
	}
	return result, nil
}