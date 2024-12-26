import React, { useEffect, useState } from 'react'
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";
import axios from 'axios';


const ActiveList = () => {

    const Deactivate = async (id) => {
        await axios
          .put(`http://localhost:8000/Update-deactivate/${id}`)
          .then((res) => {
            alert(res.data.msg);
            window.location.reload();
          })
          .catch((err) => {
            console.log(" error approving", err);
          });
      };

    const [request, setrequest] = useState([]);
  const fetchaAtive = async () => {
    await axios
      .get("http://localhost:8000/fetch-active")
      .then((res) => {
        setrequest(res.data);
      })
      .catch((err) => {
        console.log(" error fetching", err);
      });
  };
  useEffect(() => {
    fetchaAtive();
  }, []);

  return (
   <>
   <div className="wrapper">
        <Sidebar />
        <div className="main">
          <Topbar />
          <nav className="navbar navbar-expand-md  bg-light ">
            <div className="container">
              <a href="#" className="navbar-brand">
                Active List
              </a>
            </div>
          </nav>
          <div className="container mt-4">
            <table className="table table-striped table-bordered text-center">
              <thead>
                <tr>
                  <th scope="col">book_name</th>
                  <th scope="col">auther_name</th>
                  <th scope="col">book_edition</th>
                 
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(request) && request.length > 0 ? (
                  request.map((rs) => {
                    const { id, book_name, book_edition, auther_name, status } = rs;
                    return (
                      <tr key={id}>
                        <td>
                          <strong>{book_name}</strong>
                        </td>
                        <td>{book_edition}</td>
                        <td>{auther_name}</td>
                        
                        <td>
                          <span className="btn btn-success">{status}</span>
                        </td>
                        <td>
                          <div class="dropdown">
                            <button
                              class="btn btn-warning "
                              type="button"
                              onClick={() => Deactivate(id)}
                            >
                              Deactivate
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
   </>
  )
}

export default ActiveList
