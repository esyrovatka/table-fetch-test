import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Table = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  const [fetchPageParam, setFetchPageParam] = useState({
    start: 0,
    count: 50,
  });

  const fetchData = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/photos?_start=${fetchPageParam.start}&_limit=${fetchPageParam.count}`
    ).then((response) => response.json());
    setFetchPageParam({
      ...fetchPageParam,
      start: fetchPageParam.start + fetchPageParam.count,
    });
    setLoading(false);
    setRows([...rows, ...response]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (inView) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  if (loading) return <div>Loading....</div>;

  return (
    <div>
      <table style={{ width: "100%", padding: "10px", margin: "10px" }}>
        <thead>
          <tr>
            <th>albumId</th>
            <th>id</th>
            <th>Title</th>
            <th>image color 1</th>
            <th>image color 2</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} ref={ref} style={{ textAlign: "center" }}>
              <td>{row.albumId}</td>
              <td>{row.id}</td>
              <td>{row.title}</td>
              <td>
                <img alt="test" src={row.url} width="10px" height="10px" />
              </td>

              <td>
                <img
                  alt="test"
                  src={row.thumbnailUrl}
                  width="10px"
                  height="10px"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
