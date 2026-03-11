function NewsCard({news}){

  return(

    <div className="bg-white shadow rounded p-5">

      <h2 className="text-lg font-bold">
        {news.title}
      </h2>

      <p className="text-gray-600 mt-2">
        {news.description}
      </p>

      <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded mt-3 inline-block">
        {news.category}
      </span>

    </div>

  )

}

export default NewsCard