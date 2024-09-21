import React, { useEffect, useState } from "react"
import axios from 'axios'

const TagDropdown = () => {
  
  interface Tag {
    name: string
  }

  interface ApiResponse {
    items: Array<{ name: string }>
  }

  const [searchText, setSearchText] = useState<string>("")
  const [apiResponse, setApiResponse] = useState({})
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get<ApiResponse>('https://api.stackexchange.com/2.3/tags?order=desc&sort=popular&site=stackoverflow')
        const fetchedTags = response.data.items.map(item => ({name : item.name}))
        setTags(fetchedTags)
      } catch (error) {
        console.error('Erro ao buscar as tags', error);
      }
    }

    fetchTags()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  return (
    <div className="searchbar">
      <input type="text" placeholder="Add up to 5 skills" value={searchText} onChange={handleInputChange}/>
    </div>
  )

};

export default TagDropdown;
