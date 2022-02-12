import { useEffect, useState } from "react";
import { Post, Tag } from "./types";


export default function useTags(posts: Post[]) {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [filtered, setFiltered] = useState(posts);

  const allTags = posts.reduce((tags, post) => {
    const newTags = [...tags];
    post.tags.forEach(tag => {
      if (!tags.find(t => t.slug == tag.slug)) {
        newTags.push(tag);
      }
    })

    return newTags;
  }, [])

  function addTag(tag) {
    setActiveTags([...activeTags, tag]);
  }

  function removeTag(tag) {
    const newTags = activeTags.filter(t => t !== tag);
    setActiveTags(newTags);
  }

  // useEffect(() => {
  //   const newPosts = posts.filter(p => p.tags.find(t => activeTags.includes(t.slug)));
  //   setFiltered(newPosts)
  // }, [posts, activeTags])

  return { tags: allTags, activeTags, addTag, removeTag, filtered };
}