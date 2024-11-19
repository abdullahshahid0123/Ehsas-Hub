import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Topbar } from "../components/Topbar";

export const AdminDashboard = () => {
  return (
    <>
      <div className="wrapper">
         <Sidebar />
        <div className="main">
          <Topbar />
          <main class="content px-3 py-2">
                <div class="container-fluid">
                    <div class="mt-4 mb-5">
                        <ol class="breadcrumb">
                          <li class="breadcrumb-item"><a href="#">Dashboard</a></li>
                          <li class="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                      </div>
                    <div class="row">
                        <div class="col-12 col-md-6 d-flex">
                            <div class="card flex-fill border-0 illustration shadow">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-6">
                                            <div class="p-3 m-1">
                                                <h4>
                                                    WelcomeBack, Admin
                                                </h4>
                                                <p class="mb-0">Admin Dashboard, Abdulreman</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                            <img src="assets/images/customer-support.jpg" class="img-fluid illustration-img" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-md-6 d-flex">
                            <div class="card flex-fill border-0 illustration shadow">
                                <div class="card-body p-0 d-flex flex-fill">
                                    <div class="row g-0 w-100">
                                        <div class="col-6">
                                            <div class="p-3 m-1">
                                                <h4>
                                                    WelcomeBack, Admin
                                                </h4>
                                                <p class="mb-0">Admin Dashboard, Abdulreman</p>
                                            </div>
                                        </div>
                                        <div class="col-6 align-self-end text-end">
                                            <img src="assets/images/customer-support.jpg" class="img-fluid illustration-img" alt=""/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card border-0 shadow">
                        <div class="card-header">
                            <div class="card-title">
                                Basic Table
                            </div>
                            <div class="card-subtitle text-muted">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore hic inventore esse. Non a illo perferendis aspernatur, consectetur accusantium alias. Aperiam itaque possimus asperiores doloremque voluptates vero fuga veniam voluptatibus exercitationem, accusamus ratione tempora delectus ad quidem dicta quam, omnis animi enim similique. Aspernatur, et. Est dolorum voluptatem quasi neque.
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                      <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First</th>
                                        <th scope="col">Last</th>
                                        <th scope="col">Handle</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                      </tr>
                                      <tr>
                                        <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                      </tr>
                                    </tbody>
                                  </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
      </div>
    </>
  );
};
