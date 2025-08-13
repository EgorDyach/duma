import { TreeViewBaseItem } from '@mui/x-tree-view';

export const validateTeacher = (newTeacher: Teacher, isEditing?: boolean): string | undefined => {
  if (!newTeacher.fullname) return 'Необходимо ввести ФИО учителя!';
  if (!newTeacher.email) return 'Необходимо ввести email учителя!';
  
  // Проверка формата email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newTeacher.email)) return 'Введите корректный email адрес!';
  
  // При редактировании пароль не обязателен (если не указан, значит не меняем)
  if (!isEditing && !newTeacher.password) return 'Необходимо ввести пароль учителя!';
  // Убрана проверка на минимальную длину пароля по требованию
};

export const makeTree = (faculties: Faculty[], departments: Department[]) => {
  // Initialize the tree with faculties
  let tree: TreeViewBaseItem[] = faculties.map((el) => ({
    id: String(el.id!),
    label: el.name,
    children: [] as TreeViewBaseItem[], // Initialize as an empty array
  }));

  // Iterate over departments to populate the tree
  for (let i = 0; i < departments.length; i++) {
    const facultyIndex = tree.findIndex(
      (el) => +el.id === departments[i].faculty_id,
    );

    // Check if the facultyIndex is valid (not -1)
    if (facultyIndex !== -1) {
      // Push the department into the children array
      tree[facultyIndex].children!.push({
        id: `${String(departments[i].faculty_id)}_${String(departments[i].id)}`,
        label: departments[i].name,
      });
    }
  }

  console.log('tree', tree);
  return tree;
};

export const calcTeachers = (id: string, prev?: string | null) => {
  const part = id.split('_')[1];

  return part || prev || null;
};
