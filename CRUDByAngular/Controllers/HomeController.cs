using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CRUDByAngular.Models;

namespace CRUDByAngular.Controllers
{
    public class HomeController : Controller
    {
        [HttpGet]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetAllEmployee()
        {
            using (Employee_ManagementEntities db=new Employee_ManagementEntities())
            {
                var employees = db.Employees.OrderBy(a => a.Name).ToList();
                return Json(employees, JsonRequestBehavior.AllowGet);
            }
        }
        [HttpPost]
        public ActionResult SaveEmployee(Employee employee)
        {
            using (Employee_ManagementEntities db=new Employee_ManagementEntities())
            {
                db.Employees.Add(employee);
                int rowEffect = db.SaveChanges();
                return Json(rowEffect, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult DeleteEmployee(int id)
        {
            using (Employee_ManagementEntities db=new Employee_ManagementEntities())
            {
                var emp=db.Employees.Where(a => a.Id == id);
                db.Employees.Remove(emp.First());
                var rowEffect=db.SaveChanges();
                return Json(rowEffect, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult UpdateEmployee(Employee employee)
        {
            using (Employee_ManagementEntities db =new Employee_ManagementEntities())
            {
                int rowEffect = 0;
                Employee readEmployee = db.Employees.FirstOrDefault(a => a.Id == employee.Id);
                if (readEmployee!=null)
                {
                    readEmployee.Name = employee.Name;
                    readEmployee.PhoneNo = employee.PhoneNo;
                    readEmployee.Address=employee.Address;
                    db.Entry(readEmployee).State=EntityState.Modified;
                    rowEffect=db.SaveChanges();
                }
                return Json(rowEffect, JsonRequestBehavior.AllowGet);
            }
        }
    }
}