import * as types from "./actionTypes";
import CourseApi from "../api/mockCourseApi";

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function loadCourses() {
  return dispatch => {
    return CourseApi.getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function saveCourse(course) {
  return function(dispatch, getState) {
    return CourseApi.saveCourse(course)
      .then(course => {
        course.id
          ? dispatch(updateCourseSuccess(course))
          : dispatch(createCourseSuccess(course));
      })
      .catch(error => {
        throw error;
      });
  };
}
