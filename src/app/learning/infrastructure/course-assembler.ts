import {BaseAssembler} from '../../shared/infrastructure/base-assembler';
import {Course} from '../domain/model/course.entity';
import {CourseResource, CoursesResponse} from './courses-response';

export class CourseAssembler implements BaseAssembler<Course, CourseResource, CoursesResponse>{

    toEntityFromResource(resource: CourseResource): Course {
      return new Course({
        id: resource.id,
        title: resource.title,
        description: resource.description,
        categoryId: resource.categoryId});
    }

    toResourceFromEntity(entity: Course): CourseResource {
      return {
        id: entity.id,
        title: entity.title,
        description: entity.description,
        categoryId: entity.categoryId
      } as CourseResource;
    }

    toEntitiesFromResponse(response: CoursesResponse): Course[] {
      return response.courses.map(course => this.toEntityFromResource(course));
    }
}
