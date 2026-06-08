/** @jsxImportSource @emotion/react */
import Layout from '../../widgets/Layout';
import { useGetUsers, useChangeRole } from '../../features/user/api/queries';
import { showApiErrorToast } from '../../shared/lib/toast';
import type { UserRole } from '../../entities/user/types';
import {
  PageInner, PageTitle, TableCard, TableWrap, Table,
  HeaderRow, Th, DataRow, Td, RoleBadge, RoleBtn, EmptyRow,
} from './style';

const UserManagementPage = () => {
  const { data: users = [], isLoading } = useGetUsers();
  const changeRoleMutation = useChangeRole();

  const handleRoleToggle = async (id: string, currentRole: UserRole) => {
    const nextRole: UserRole = currentRole === 'ADMIN' ? 'EMPLOYEE' : 'ADMIN';
    try {
      await changeRoleMutation.mutateAsync({ id, role: nextRole });
    } catch (error) {
      showApiErrorToast(error, '권한 변경에 실패했습니다.');
    }
  };

  return (
    <Layout>
      <PageInner>
        <PageTitle>사용자 관리</PageTitle>

        <TableCard>
          <TableWrap>
            <Table>
              <colgroup>
                <col />
                <col style={{ width: '220px' }} />
                <col style={{ width: '120px' }} />
                <col style={{ width: '160px' }} />
                <col style={{ width: '120px' }} />
              </colgroup>
              <thead>
                <HeaderRow>
                  <Th>이름</Th>
                  <Th>이메일</Th>
                  <Th>권한</Th>
                  <Th>가입일</Th>
                  <Th>권한 변경</Th>
                </HeaderRow>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <EmptyRow colSpan={5}>불러오는 중...</EmptyRow>
                  </tr>
                )}
                {!isLoading && users.length === 0 && (
                  <tr>
                    <EmptyRow colSpan={5}>사용자가 없습니다.</EmptyRow>
                  </tr>
                )}
                {users.map((user) => (
                  <DataRow key={user.id}>
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <RoleBadge isAdmin={user.role === 'ADMIN'}>
                        {user.role === 'ADMIN' ? '관리자' : '직원'}
                      </RoleBadge>
                    </Td>
                    <Td>{user.createdAt ? user.createdAt.slice(0, 10) : '-'}</Td>
                    <Td>
                      <RoleBtn
                        type="button"
                        onClick={() => void handleRoleToggle(user.id, user.role)}
                        disabled={changeRoleMutation.isPending}
                      >
                        {user.role === 'ADMIN' ? '직원으로 변경' : '관리자로 변경'}
                      </RoleBtn>
                    </Td>
                  </DataRow>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        </TableCard>
      </PageInner>
    </Layout>
  );
};

export default UserManagementPage;
