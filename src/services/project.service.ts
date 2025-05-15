import { CreateProjectBody, ProjectSchema } from 'src/types/project.type';
import { instance } from './config/instance';
import { useMutation, useQuery } from '@tanstack/react-query';

// ----- GET -----

export const getProjects = async () => {
  const res = await instance.get('/v1/projects', {
    schema: ProjectSchema.array(),
  });
  return res;
};

export const useGetProjects = () => {
  return useQuery({
    queryKey: ['project'],
    queryFn: getProjects,
  });
};

export const getProject = async (id: number) => {
  const res = await instance.get(`/v1/projects/${id}`, {
    schema: ProjectSchema,
  });
  return res;
};

export const useGetProject = (id: number) => {
  return useQuery({
    queryKey: ['project', id],
    queryFn: () => getProject(id),
  });
};

// ----- POST -----

export const postProject = async (body: CreateProjectBody) => {
  const res = await instance.post('/v1/projects', body, {
    schema: ProjectSchema,
  });
  return res;
};

export const usePostProject = () => {
  return useMutation({
    mutationFn: postProject,
  });
};

export const putProject = async (id: number, body: CreateProjectBody) => {
  const res = await instance.put(`/v1/projects/${id}`, body, {
    schema: ProjectSchema,
  });
  return res;
};

export const usePutProject = () => {
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: CreateProjectBody }) =>
      putProject(id, body),
  });
};
