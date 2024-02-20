import React, { useState } from 'react';
import MainTable from '../component/maintable';
import SideTable from '../component/sidetable';
import Newtask from '../component/newtask';
import Tabs from '../component/tabs';

const Home = () => {
  const [activeTab, setActiveTab] = useState('main');
  const [sortingOption, setSortingOption] = useState('start');
  const [searchTerm, setSearchTerm] = useState('');
  const [todos, setTodos] = useState([]);

  const handleToggleTab = () => {
    setActiveTab(activeTab === 'main' ? 'side' : 'main');
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
  };

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const handleAddTask = (newTask) => {
    setTodos((prevTodos) => [...prevTodos, newTask]);
  };

  return (
    <div>
      <Newtask onAddTask={handleAddTask}/>
      <Tabs 
        activeTab={activeTab} 
        onToggleTab={handleToggleTab} 
        onSortingChange={handleSortingChange} 
        onSearchChange={handleSearchChange}
      />
      {activeTab === 'main' ? 
      <MainTable sortingOption={sortingOption} searchTerm={searchTerm} /> 
      : 
      <SideTable sortingOption={sortingOption} searchTerm={searchTerm}/>}
    </div>
  );
};

export default Home;